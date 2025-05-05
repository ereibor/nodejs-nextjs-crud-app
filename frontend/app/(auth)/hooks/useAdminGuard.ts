import { RootState } from '@/redux/store';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

type DecodedToken = {
  role: string;
  [key: string]: unknown; // Add other properties if needed
};

export default function useAdminGuard() {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    useEffect(() => {
      // Reset checking state when token changes
      setIsChecking(true);
      
      if (!token) {
        router.replace('/');
        setIsChecking(false);
        return;
      }
      
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.role !== 'admin') {
          router.replace('/login');
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error('Invalid token:', err);
        router.replace('/login');
        setIsAuthorized(false);
      } finally {
        setIsChecking(false);
      }
    }, [token, router]);
    
    return { isChecking, isAuthorized };
  }