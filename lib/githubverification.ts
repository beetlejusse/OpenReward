import  connectDB from '@/lib/mongodb';
import { BountyProvider } from '@/models/BountyProviderModel';
import { graphql } from "@octokit/graphql";

export default async function getGithubOrgVerification({ req, res }: any, githubToken: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const { orgName, method, walletAddress } = req.body;

  try {
    // GitHub API verification
    const { organization }: { organization: any } = await graphql({
      query: `
        query($orgName: String!) {
          organization(login: $orgName) {
            viewerIsAMember
            viewerCanAdminister
            repositories(first: 1) {
              nodes {
                name
              }
            }
          }
        }
      `,
      orgName,
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    });

    if (!organization.viewerCanAdminister) {
      return res.status(403).json({ 
        success: false,
        message: 'User is not an organization admin'
      });
    }

    // Update provider record
    await BountyProvider.findOneAndUpdate(
      { walletAddress },
      {
        githubOrgVerified: true,
        githubOrgName: orgName,
        verificationMethod: method,
        lastVerifiedAt: new Date()
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false,
      message: (error as Error).message 
    });
  }
}
