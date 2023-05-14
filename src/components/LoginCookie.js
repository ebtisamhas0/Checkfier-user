import { useState, useEffect } from 'react';

export function useLoginStateFromCookie() {
  const [phone, setPhone] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)phone\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (cookieValue) {
      const [cookiePhone, cookiePoints] = cookieValue.split(';').map((item) => item.trim());
      setPhone(cookiePhone.split('=')[1]);
      setPoints(cookiePoints.split('=')[1]);
    }
  }, []);

  return { phone, points };
}
