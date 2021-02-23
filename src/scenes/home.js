import React, {useCallback, useRef} from 'react';
import {connect, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import {StatusBar, Animated, View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import {useTheme, FAB} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../contexts/theme';
import {TaskView, EmptyView} from '../components';

const Home = (props) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const scrollY = useRef(new Animated.Value(0)).current;

  const {todos: todoItems} = useSelector((state) => state.todoReducer);

  const {activeUser} = useSelector((state) => state.userReducer);

  const checkTodo = todoItems.filter((item) => {
    return activeUser.id === item.userId;
  });
  const {isThemeDark} = React.useContext(ThemeContext);

  const handleSelect = useCallback(
    (item) => {
      navigation.navigate('TodoDetail', {selected: item});
    },
    [navigation]
  );

  const barStyle = isThemeDark ? 'light-content' : 'dark-content';
  return (
    <View style={styles.linearGradient}>
      <View>
        <StatusBar backgroundColor={theme.colors.background} barStyle={barStyle} />

        {checkTodo.length === 0 ? (
          <Animatable.View animation="bounce">
            <EmptyView
              content="YOU HAVE NO TASK TODAY !"
              information="You can start to make your todos by pressing the button below"
              action={() => navigation.navigate('Todo')}
              actionTitle="make todo"
            />
          </Animatable.View>
        ) : (
          <ScrollView contentContainerStyle={styles.container1} keyboardShouldPersistTaps="handled">
            <View style={styles.tasksWrapper}>
              <View style={styles.items}>
                {checkTodo.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => handleSelect(item)} key={index}>
                      <TaskView todoItem={item} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <FAB style={styles.fab} large icon="plus" onPress={() => navigation.navigate('Todo')} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    reduxData: state.todoReducer.todo,

    reduxClientId: (state.userReducer.activeUser || {}).id,
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
    backgroundColor: 'magenta',
  },
  container: (theme) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  linearGradient: {
    flex: 1,
  },
  container1: {flexGrow: 1},

  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'relative',
    paddingVertical: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
});
