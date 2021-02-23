import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

import {View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import {Title, Button, FAB, useTheme, Subheading, ToggleButton, Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet';
import {removeTodo, updateTodo, updateTodos} from '../redux/actions/todo';
import {ListHeader} from '../components';
import {showNotification, handleScheduleNotification} from '../components/local-push-notif';

const TodoDetail = ({route, reduxUpdateTodo, reduxRemoveTodo}) => {
  const {selected} = route.params;
  const [todo, setTodo] = useState({
    completed: false,
    id: selected.id,
    title: selected.title,
    day: selected.day,
    dueDate: selected.dueDate,
    todoId: selected.todoId,
    shouldRemind: selected.shouldRemind,
  });
  const [visible, setVisible] = React.useState(false);

  const [date, setDate] = useState(new Date(1613051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [notifMsg, setNotifMsg] = useState('Push Notification');
  const theme = useTheme();
  const sheetRef = useRef(null);
  const navigation = useNavigation();

  const [status, setStatus] = useState('enabled');

  const [finished, setFinished] = useState(false);
  const onButtonToggle = (value) => {
    setStatus(status !== 'enabled' ? 'enabled' : 'disabled');
    setNotifMsg(
      status === 'enabled'
        ? `Push notifications enabled for ${selected.title}`
        : `Push notifications disabled for ${selected.title}`
    );
    showNotification(123, notifMsg, selected.title);
  };

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    setVisible(false);
    navigation.navigate('Home');
  };

  const onCompleted = () => {
    setFinished(!finished !== false);
  };
  console.log(finished);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTodo({
      ...todo,
      dueDate: selectedDate,
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    Keyboard.dismiss();
  };

  const showTimepicker = () => {
    showMode('time');
    Keyboard.dismiss();
  };

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setTodo({
        ...todo,
        title: val,
      });
    }
  };
  const renderContent = () => (
    <View style={styles.sheetView}>
      <Title>Are you sure?</Title>
      <Subheading>To-do will be deleted</Subheading>
      <View style={styles.sheetTop}>
        <Button
          color="red"
          style={styles.btnS}
          onPress={() => {
            reduxRemoveTodo(selected);
            sheetRef.current.snapTo(0);
            navigation.goBack();
          }}>
          DELETE
        </Button>
      </View>
    </View>
  );
  const handleUpdateTask = () => {
    reduxUpdateTodo({...todo, title: todo.title, dueDate: date, reminder: status});
    onToggleSnackBar();
  };

  const handleRemove = () => {
    sheetRef.current.snapTo(1);
  };

  return (
    <>
      <View style={styles.listHeader}>
        <ListHeader header="Update to-do " subHeader="Type your task below" />
      </View>
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}>
          <TextInput
            multiline
            style={styles.input}
            placeholder={selected.title}
            value={todo.title}
            onChangeText={(val) => textInputChange(val)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.viewTop}>
        <View>
          <View style={styles.listHeader}>
            <ListHeader header="Update Day" />
          </View>

          <View>
            <Button
              contentStyle={styles.surface}
              icon="calendar"
              mode="outlined"
              onPress={() => showDatepicker()}>
              Select Day!
            </Button>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <View>
          <View style={styles.listHeader}>
            <ListHeader header="Update Time" />
          </View>

          <View>
            <Button
              contentStyle={styles.surface}
              icon="clock"
              mode="outlined"
              onPress={() => showTimepicker()}>
              Select Time!
            </Button>
          </View>
        </View>
        <View style={styles.reminder}>
          <View style={styles.listHeader}>
            <ListHeader header="Set a reminder" subHeader="toggle the clock icon" />
          </View>
          <View style={styles.radio}>
            <ToggleButton
              icon={status === 'enabled' ? 'alarm' : 'alarm-off'}
              color={status === 'enabled' ? 'magenta' : 'tomato'}
              size={48}
              value="enabled"
              status={status}
              onPress={(val) => {
                onButtonToggle(val);
              }}
            />
          </View>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: '',
          onPress: () => {},
        }}>
        Updated successfully
      </Snackbar>
      <View style={styles.btnView(theme)}>
        <View style={styles.btnContainer}>
          <Button style={styles.btnLeft} mode="outlined" onPress={() => handleUpdateTask()}>
            update
          </Button>
          <Button onPress={() => handleRemove()} style={styles.btnRight} mode="outlined">
            delete
          </Button>
        </View>
        <FAB
          style={styles.fab}
          label={finished ? 'done' : 'undone'}
          large
          icon={finished ? 'check' : 'close'}
          color={finished ? 'magenta' : 'tomato'}
          onPress={() => {
            onCompleted();
          }}
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[-450, 200, 0]}
        borderRadius={30}
        renderContent={renderContent}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxRemoveTodo: (item) => dispatch(removeTodo(item)),
    reduxUpdateTodo: (todo) => dispatch(updateTodo(todo)),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedTodo: state.todoReducer.todos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetail);

const styles = StyleSheet.create({
  container: (theme) => ({backgroundColor: theme.colors.background, flex: 1}),
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  listHeader: {left: 10, top: 15},
  container1: {flexGrow: 1},
  mr: {marginRight: 10},
  items: {
    marginTop: 30,
  },
  radio: {top: 20, left: 30, flexDirection: 'row'},
  reminder: {flexDirection: 'row', alignItems: 'center'},
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
    width: '90%',
  },
  surface: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    left: 8,
  },
  addWrapper: (theme) => ({
    width: 60,
    height: 60,
    backgroundColor: theme.colors.surface,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  }),
  addText: {fontSize: 36, fontStyle: 'italic'},
  rightText: {fontStyle: 'italic'},
  footer: {position: 'relative'},
  viewTop: {top: -20},
  left: {left: 20},
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 30,
  },
  btnGroup: {flexDirection: 'row', justifyContent: 'center', marginTop: 20},
  notifView: (theme) => ({
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    elevation: 5,
    height: 125,
    marginHorizontal: 30,
  }),

  sheetView: {
    backgroundColor: 'gray',
    padding: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnS: {backgroundColor: 'white'},
  sheetTop: {top: 20},

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
    marginHorizontal: 20,
  },
  btnView: (theme) => ({}),
  btnLeft: {flex: 1, marginRight: 4},
  btnRight: {flex: 1, marginLeft: 4},
});
