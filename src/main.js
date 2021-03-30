const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const github = require('@actions/github');

const events = ['APPROVE', 'REQUEST_CHANGES', 'COMMENT'];

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = new Octokit({ auth: `token ${token}` });
    const context = github.context;

    const { owner, repo } = context.repo;
    const number = context.payload.pull_request.number;
    console.log(context.eventName)
    const approve_body = core.getInput('approve_comment');

    await octokit.pulls.createReview({
      owner,
      repo,
      pull_number: number,
      event: events[0],
      body: approve_body,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
