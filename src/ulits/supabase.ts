import { createClient } from '@supabase/supabase-js';

// 从环境变量中获取 Supabase URL 和匿名密钥
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 定义白名单表的类型
interface WhitelistEntry {
  id: string;
  address: string;
  position: number;
  status: 'waiting' | 'approved';
  joined_at: string;
  referrer: string | null;
  referral_count: number;
}

// 白名单相关的数据库操作
export const whitelistDB = {
  async getStatus(address: string): Promise<WhitelistEntry | null> {
    const { data, error } = await supabase
      .from('whitelist_users')
      .select('*')
      .eq('wallet_address', address.toLowerCase())
      .single();

    if (error) {
      console.error('Error getting whitelist status:', error);
      return null;
    }

    return data;
  },

  async checkAddress(address: string) {
    const status = await this.getStatus(address);
    return !!status;
  },

  async addAddress(address: string, referrer: string = "0x0000000000000000000000000000000000000000") {
    try {
      const { data: existingEntry } = await supabase
        .from('whitelist_users')
        .select('*')
        .eq('wallet_address', address.toLowerCase())
        .single();

      if (existingEntry) {
        throw new Error('Address already whitelisted');
      }

      const { data, error } = await supabase
        .from('whitelist_users')
        .insert([
          { 
            wallet_address: address.toLowerCase(),
            referrer: referrer.toLowerCase(),
            joined_at: new Date().toISOString(),
            status: 'waiting'
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in addAddress:", error);
      throw error;
    }
  },

  async getReferralCount(address: string) {
    const { data, error } = await supabase
      .from('whitelist_users')
      .select('referral_count')
      .eq('wallet_address', address.toLowerCase())
      .single();

    if (error) {
      console.error('Error getting referral count:', error);
      return 0;
    }

    return data?.referral_count || 0;
  },

  async getTotalCount() {
    const { count, error } = await supabase
      .from('whitelist_users')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error getting total count:', error);
      return 0;
    }

    return count || 0;
  }
}; 