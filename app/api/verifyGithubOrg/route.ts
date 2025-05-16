import  connectDB from '@/lib/mongodb';
import { BountyProvider } from '@/models/BountyProviderModel';
import getGithubOrgVerification  from '@/lib/githubverification';

export default async function handler({req, res}: any) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { orgName, githubToken } = req.body;
  
  try {
    const verification = await getGithubOrgVerification(orgName, githubToken);
    
    await BountyProvider.findOneAndUpdate(
      { walletAddress: req.user.address },
      { 
        githubOrgVerified: verification.isVerified,
        verificationMethod: verification.method,
        lastVerifiedAt: new Date()
      }
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
}
