import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, Layout, Divider, List, ListItem } from '@ui-kitten/components';
import  {DeviceEventEmitter} from 'react-native';
import '../user.js';

export default function Help({ navigation }) {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData();
    DeviceEventEmitter.addListener("EventType", ()=>{
      fetchData();
    });
  }, []);

  async function fetchData() {
      let getData = await fetch('http://101.35.20.193:8088/need/all');
      let res = await getData.json();
      setData(res);
  }

  const navigateSubmit = () => {
    if (isLogin)
      navigation.navigate('Submit');
    else
      navigation.navigate('SignIn');
  };

  const EditIcon = (props) => (
    <Icon onPress={navigateSubmit} {...props} name='edit'/>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon}/>
    </React.Fragment>
  );

  const renderItem = ({item}) => (
    <ListItem
      title={item.category}
      description={item.description}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment='center'
        title='Help'
        accessoryRight={renderRightActions}
      />
      <Divider/>
      <List
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
      style={{marginLeft: 5, marginRight:5}}
    />
    </Layout>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});