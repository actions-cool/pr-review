const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = new Octokit({ auth: `token ${token}` });
    const context = github.context;
    core.info(`token: ${token},eventName: ${context.eventName}`);
    const { owner, repo } = context.repo;
    const number = context.payload.pull_request.number;

    await octokit.pulls.createReview({
      owner,
      repo,
      pull_number: number,
      event: 'APPROVE',
      body: '1234',
    })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();