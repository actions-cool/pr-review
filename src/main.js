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

    const comment = core.getInput('comment');
    const type = core.getInput('type');

    if (!events.includes(type)) {
      core.info('Wrong review, please use APPROVE or REQUEST_CHANGES or COMMENT');
    }

    await octokit.pulls.createReview({
      owner,
      repo,
      pull_number: number,
      event: type,
      comments: [
        {
          path: '/',
          body: comment,
        },
      ],
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
