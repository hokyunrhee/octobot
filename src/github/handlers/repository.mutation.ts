import { octokit } from "./octokit-client"

export default {
  updateBranchProtection,
  createOrUpdateFileContents,
}

type CreateOrUpdateFileContentsProps = {
  owner: string
  repo: string
  path: string
  content: string
}

async function createOrUpdateFileContents(props: CreateOrUpdateFileContentsProps) {
  const { content, ...restProps } = props
  const options = {
    committer: {
      name: "octobot",
      email: "help@octobot.io",
    },
    message: "created or updated by octobot",
  }
  const sha = await octokit.rest.repos
    .getContent(restProps)
    .then((res) => (res.data as Record<"sha", string>).sha)
    .catch(() => undefined)

  await octokit.rest.repos.createOrUpdateFileContents({
    ...restProps,
    content: Buffer.from(content).toString("base64"),
    ...options,
    sha,
  })
}

type UpdateBranchProtectionProps = {
  owner: string
  repo: string
  branch: string
}

async function updateBranchProtection(props: UpdateBranchProtectionProps) {
  const options = {
    required_status_checks: null,
    enforce_admins: true,
    restrictions: null,
    required_pull_request_reviews: {
      required_approving_review_count: 1,
      require_code_owner_reviews: true,
    },
    required_conversation_resolution: true,
  }

  await octokit.rest.repos.updateBranchProtection({
    ...props,
    ...options,
  })
}
