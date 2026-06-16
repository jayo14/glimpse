import { supabaseAdmin } from '../utils/supabase.js';
import logger from '../utils/logger.js';

export const addToWaitlist = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .insert([{ email }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ message: 'Email already in waitlist' });
      }
      throw error;
    }

    logger.info(`Email ${email} added to waitlist`);
    return res.status(201).json({ message: 'Successfully added to waitlist', data });
  } catch (err) {
    logger.error('Waitlist error:', err);
    next(err);
  }
};
