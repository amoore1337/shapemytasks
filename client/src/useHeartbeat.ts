import { useEffect } from 'react';

import { useLazyQuery, gql } from '@apollo/client';

// const HEARTBEAT = gql`
//   query Heartbeat {
//     heartbeat {
//       authenticated
//     }
//   }
// `;

export default function useHeartbeat() {
  // const [checkHealth, { data }] = useLazyQuery<any>(HEARTBEAT, { nextFetchPolicy: 'network-only' });

  // useEffect(() => {
  //   checkHealth();
  // }, []);
  // console.log('data: ', data);
}
