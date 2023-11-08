import { octokit } from "./octokit-client"

export default {
  listForUser,
  listForOrg,
}

async function listForUser(user: string) {
  const response = await octokit.paginate("GET /users/{user}/repos", {
    user,
  })
  const repos = (response as { id: number; name: string; html_url: string }[]).map(({ id, name, html_url }) => ({
    id,
    name,
    html_url,
  }))

  return repos
}

async function listForOrg(org: string) {
  const response = await octokit.paginate("GET /orgs/{org}/repos", {
    org,
  })
  const repos = (response as { id: number; name: string; html_url: string }[]).map(({ id, name, html_url }) => ({
    id,
    name,
    html_url,
  }))

  return repos
}
