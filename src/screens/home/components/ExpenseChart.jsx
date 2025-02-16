import {
  View,
  Text,
  Dimensions,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {darkColors, lightColors} from '../../../constants/colors';
import currency from '../../../constants/currency';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserWeeklyExpenseStats} from '../../../slices/statsSlice';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';

const ExpenseChart = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const [weekdayLabels, setWeekdayLabels] = useState([]);
  const [spentAmountDataSet, setSpentAmountDataSet] = useState([]);

  const dispatch = useDispatch();

  const {lastWeekStats, statsLoading, statsError, statsSuccessMessage} =
    useSelector(state => state.stats);

  const {expenseStats} = useSelector(state => state.expense);

  const getUserWeeklyExpenseStats = async () => {
    try {
      const result = await dispatch(fetchUserWeeklyExpenseStats());

      console.log('Result from getUserWeeklyExpenseStats', result);
      if (fetchUserWeeklyExpenseStats.fulfilled.match(result)) {
        console.log('User Weekly Expense stats fetched fulfilled!');
        const x = result.payload.map((item, ind) => {
          return item.weekday;
        });

        const y = result.payload.map((item, ind) => {
          return Math.round(item.spentAmount);
        });

        setWeekdayLabels(x);
        setSpentAmountDataSet(y);
        console.log(x, y);
      } else {
        console.log('Weekly expense stats fetching failed:', result.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserWeeklyExpenseStats();
  }, [expenseStats]);

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          color: colors.header,
          padding: 5,
          marginHorizontal: 10,
        }}>
        This Week Expenses
      </Text>
      {statsLoading ? (
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <ContentLoader
            speed={1}
            width={Dimensions.get('window').width * 0.9}
            height={220}
            backgroundColor={colors.primary}
            foregroundColor={colors.tertiary}>
            <Rect rx="10" ry="10" width="100%" height="100%" />
          </ContentLoader>
        </View>
      ) : weekdayLabels.length == 0 || spentAmountDataSet.length == 0 ? (
        <View style={{marginVertical: 100}}>
          <Text
            style={{
              color: colors.muted,
              fontSize: 18,
              padding: 12,
              alignSelf: 'center',
            }}>
            No data for this week
          </Text>
        </View>
      ) : (
        <LineChart
          data={{
            labels: weekdayLabels,
            datasets: [
              {
                data: spentAmountDataSet,
              },
            ],
          }}
          fromZero={true}
          width={Dimensions.get('window').width * 0.9}
          height={220}
          yAxisLabel={currency.symbol}
          yAxisInterval={1} // optional, defaults to 1
          formatYLabel={value => Math.round(value)}
          chartConfig={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            backgroundGradientFrom: colors.secondary,
            backgroundGradientTo: colors.tertiary,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: colors.secondary,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 12,
            alignItems: 'center',
          }}
        />
      )}
    </View>
  );
};

export default ExpenseChart;
