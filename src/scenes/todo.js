import React, {useState} from 'react';
import {connect} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, TextInput, KeyboardAvoidingView, Platform, StyleSheet, Keyboard} from 'react-native';
import {Button, ToggleButton, FAB, useTheme, Snackbar} from 'react-native-paper';

import {ListHeader} from '../components';
import {addTodo, removeTodo} from '../redux/actions/todo';

const Todo = (props) => {
  const [task, setTask] = useState({
    completed: false,
    title: '',
    day: '',
    dueDate: '',
    todoId: '',
    shouldRemind: '',
  });

  const theme = useTheme();
  const [date, setDate] = useState(new Date(1614391730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const [status, setStatus] = useState('disabled');
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setTask({
      ...task,
      dueDate: date,
    });
  };

  const onButtonToggle = (value) => {
    setStatus(status !== 'enabled' ? 'enabled' : 'disabled');
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
      setTask({
        ...task,
        // id: GeneratorUtils.uuuidv4(),
        title: val,
        // date: created,
      });
    }
  };
  const handleAddTask = () => {
    if (task.title.length === 0) return;

    props.reduxSaveTodo({
      title: task.title,
      dueDate: date,
      shouldRemind: status,
    });
    onToggleSnackBar();
    setTimeout(() => {
      props.navigation.navigate('Home');
    }, 1000);
  };
  return (
    <View style={styles.container(theme)}>
      <View style={styles.listHeader}>
        <ListHeader header="Add to-do" subHeader="Type your task below" />
      </View>
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.writeTaskWrapper}>
          <TextInput
            multiline
            style={styles.input}
            placeholder="Add to-do"
            value={task.title}
            onChangeText={(val) => textInputChange(val)}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.viewTop}>
        <View>
          <View style={styles.listHeader}>
            <ListHeader header="When task ends" />
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
            // datetime
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
            <ListHeader header="Be more specific" />
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
              onPress={(val) => onButtonToggle(val)}
            />
          </View>
        </View>
      </View>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={() => {
          handleAddTask();
        }}
      />
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: '',
          onPress: () => {},
        }}>
        Added successfully
      </Snackbar>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxSaveTodo: (task) => dispatch(addTodo(task)),
    reduxRemoveTodo: (item) => dispatch(removeTodo(item)),
  };
};

// TODO: DELETE
export default connect(null, mapDispatchToProps)(Todo);

const styles = StyleSheet.create({
  container: (theme) => ({backgroundColor: theme.colors.background, flex: 1}),
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  radio: {top: 20, left: 30},
  listHeader: {left: 10, top: 15},
  container1: {flexGrow: 1},
  mr: {marginRight: 10},
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
  reminder: {flexDirection: 'row', alignItems: 'center'},
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
    backgroundColor: 'magenta',
  },
});
