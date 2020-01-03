import { map, get } from 'lodash/fp';
import { JobNode, UserNode } from './nodes';
import { createInstance, fetchJobs, getUsers } from './api';

exports.sourceNodes = async ({ actions, reporter }, options) => {
  const { createNode } = actions

  const token = options.token || null;
  const version = options.version || null;

  if (token == null) {    
    reporter.panicOnBuild(`Invalid token for gatsby-source-teamtailor`);
  }

  if (version == null) {
    reporter.panicOnBuild(`Invalid version for gatsby-source-teamtailor`);
  }

  try {

    createInstance({
      Authorization: `Token token=${token}`,
      'X-Api-Version': version,
      Accept: 'application/vnd.api+json'
    });

    // Fetch all jobs from teamtailor
    const getJobs = await fetchJobs();
    const fetchUsers = await getUsers();

    const [ allJobs, allUsers ] = await Promise.all([ getJobs, fetchUsers ]);

    map((job) => {
      const jobNode = JobNode(job)
      createNode(jobNode)
    }, allJobs.data);

    map((user) => {
      const userNode = UserNode(user)
      createNode(userNode)
    }, allUsers);

    reporter.success(`[gatsby-source-teamtailor] created ${allJobs.data.length} jobs`)
    reporter.success(`[gatsby-source-teamtailor] created ${allUsers.length} users`)

    return;

  } catch (error) {
    
    if ( get('response.data.errors', error) ) {
      reporter.panicOnBuild(`An error occured in gatsby-source-teamtailor`, error);
    } else {
      reporter.panicOnBuild(`An error occured in gatsby-source-teamtailor`, error);
    }

    process.exit(1)
  }

};


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define tags as an non nullable array of strings
  // this is to make sure that gatsby understand how to handle a situation
  // where tags could be an empty array

  const typeDefs = `
    type TeamTailorJob implements Node {      
      recruiter: TeamTailorUser @link(by: "id", from: "recruiterId")      
    }

    type TeamTailorUser implements Node {
      teamTailorId: String
    }
  `;

  createTypes(typeDefs);
}
