import { NextApiResponseServerIo } from '@/type';
import { NextApiRequest } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed!' });
    }
    try {
        
    } catch (error) {
        console.log('[MESSAGE_POST_ERROR]:', error);
        return res.status(500).json({ message: 'Internal Error' });
    }
}
