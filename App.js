// import { View, Text, SafeAreaView } from 'react-native'
// import React, { useEffect } from 'react'
// import AppNavigation from './src/navigation'
// import { apiCall } from './src/api/openAi'

// export default function App() {
//   apiCall('Your prompt here').then(response => {
//     console.log('Function Response:', response);
//   });
//   return (
//     <AppNavigation />
//   )
// }

import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import AppNavigation from './src/navigation';
import { apiCall } from './src/api/openAi';

export default function App() {
  // const [response, setResponse] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await apiCall('hai');
  //     setResponse(result);
  //   };

  //   fetchData();
  // }, []);

  return (
    //   <SafeAreaView style={styles.container}>
    //     <AppNavigation />
    //     <View style={styles.responseContainer}>
    //       {response ? (
    //         <Text>{response.success ? response.data.choices[0].message.content : response.msg}</Text>
    //       ) : (
    //         <Text>Loading...</Text>
    //       )}
    //     </View>
    //   </SafeAreaView>
    <AppNavigation />
  );

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   responseContainer: {
//     padding: 16,
//   },
// });
