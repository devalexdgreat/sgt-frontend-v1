// export default async function useFetch(arg) {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/${arg}`, {
//             cache: "no-store",
//         });
        
//         if (!response.ok) {
//             throw new Error("Failed to fetch");
//         }
  
//         const data = await response.json();
    
//         // Check if the data is valid
//         if (!data || typeof data !== 'object') {
//           throw new Error('Invalid data received');
//         }
    
//         return data;
  
//     } catch (error) {
//         console.error('Fetch error:', error.message);
//         // Return a fallback value or handle the error as necessary
//         return null; // or { error: error.message } or a default data object
//     }
// };

// export default async function useFetch(arg) {
//     const timeout = 10000; // 5 seconds timeout for the fetch request

//     const fetchWithTimeout = new Promise((resolve, reject) => {
//         const timer = setTimeout(() => {
//             reject(new Error('Request timed out'));
//         }, timeout);

//         fetch(`${process.env.NEXT_PUBLIC_BASEURL}/${arg}`, {
//             cache: "no-store",
//         })
//         .then((response) => {
//             clearTimeout(timer);
//             if (!response.ok) {
//                 reject(new Error("Failed to fetch"));
//             }
//             return response.json();
//         })
//         .then((data) => {
//             if (!data || typeof data !== 'object') {
//                 reject(new Error('Invalid data received'));
//             }
//             resolve(data);
//         })
//         .catch((error) => {
//             clearTimeout(timer);
//             reject(error);
//         });
//     });

//     try {
//         return await fetchWithTimeout;
//     } catch (error) {
//         console.error('Fetch error:', error.message);
//         // Return a fallback value or handle the error as necessary
//         return null; // or { error: error.message } or a default data object
//     }
// }

export default async function useFetch(arg, retries = 3, delay = 2000) {
    const timeout = 10000; // 10 seconds timeout for the fetch request
  
    const fetchWithTimeout = () =>
      new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error('Request timed out'));
        }, timeout);
  
        fetch(`${process.env.NEXT_PUBLIC_BASEURL}/${arg}`, {
          cache: "no-store",
        })
          .then((response) => {
            clearTimeout(timer);
            if (!response.ok) {
              reject(new Error("Failed to fetch"));
            }
            return response.json();
          })
          .then((data) => {
            if (!data || typeof data !== 'object') {
              reject(new Error('Invalid data received'));
            }
            resolve(data);
          })
          .catch((error) => {
            clearTimeout(timer);
            reject(error);
          });
      });
  
    for (let i = 0; i < retries; i++) {
      try {
        return await fetchWithTimeout();
      } catch (error) {
        console.error(`Fetch error (attempt ${i + 1}):`, error.message);
        if (i < retries - 1) {
          // Delay before retrying 
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          // If it's the last attempt, return an error or null
          return { error: error.message };
        }
      }
    }
  }
  