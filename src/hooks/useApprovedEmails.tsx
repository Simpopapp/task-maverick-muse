import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { ApprovedEmail, UserRole } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './useAuth';

export const useApprovedEmails = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: approvedEmails, isLoading } = useQuery({
    queryKey: ['approved-emails'],
    queryFn: async () => {
      if (user?.role !== 'leader') return [];
      
      const { data, error } = await supabase
        .from('approved_emails')
        .select('*');
        
      if (error) throw error;
      return data;
    },
    enabled: user?.role === 'leader',
  });

  const approveEmail = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: UserRole }) => {
      if (user?.role !== 'leader') {
        throw new Error('Only leaders can approve emails');
      }

      const { data, error } = await supabase
        .from('approved_emails')
        .insert([{
          email,
          role,
          approved_by: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approved-emails'] });
      toast({
        title: "Success",
        description: "Email approved successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const removeApprovedEmail = useMutation({
    mutationFn: async (id: string) => {
      if (user?.role !== 'leader') {
        throw new Error('Only leaders can remove approved emails');
      }

      const { error } = await supabase
        .from('approved_emails')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['approved-emails'] });
      toast({
        title: "Success",
        description: "Approved email removed successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    approvedEmails,
    isLoading,
    approveEmail,
    removeApprovedEmail,
  };
};