// export default async function useAuthFetch(arg, token) {
//     try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/${arg}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             cache: "no-store"
//         });
        
//         if (!response.ok) {
//             throw new Error("Failed to fetch");
//         }
  
//         const data = await response.json();
    
//         // Check if the data is valid
//         if (!data || typeof data !== 'object') {
//           throw new Error('Invalid data received');
//         }
    
//         return data.seasons;
  
//     } catch (error) {
//         console.error('Fetch error:', error.message);
//         // Return a fallback value or handle the error as necessary
//         return null; // or { error: error.message } or a default data object
//     }
// };

export default async function useAuthFetch(arg, token) {
    // Set a timeout for the request (in milliseconds, 10000 = 10 seconds)
    const timeout = 8000; // Adjust the timeout duration as needed

    // Timeout function
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Request timed out"));
        }, timeout);
    });

    // Fetch data with a timeout
    try {
        const fetchPromise = fetch(`${process.env.NEXT_PUBLIC_BASEURL}/${arg}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: "no-store"
        });

        const response = await Promise.race([fetchPromise, timeoutPromise]);

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const data = await response.json();

        // Check if the data is valid
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data received');
        }

        return data.seasons;

    } catch (error) {
        console.error('Fetch error:', error.message);
        // Return a fallback value or handle the error as necessary
        return null; // or { error: error.message } or a default data object
    }
}