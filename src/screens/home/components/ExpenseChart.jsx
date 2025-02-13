import {View, Text, Dimensions, useColorScheme} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {darkColors, lightColors} from '../../../constants/colors';
import currency from '../../../constants/currency';

const ExpenseChart = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = isDarkMode ? darkColors : lightColors;

  const sampleData = [
    {weekday: 'Sat', date: '2025-02-08', spentAmount: 25.0},
    {weekday: 'Sun', date: '2025-02-09', spentAmount: 1548.0},
    {weekday: 'Mon', date: '2025-02-10', spentAmount: 823.0},
    {weekday: 'Tue', date: '2025-02-11', spentAmount: 1028.0},
    {weekday: 'Wed', date: '2025-02-12', spentAmount: 550.0},
  ];

  const weekdayLabels = sampleData.map((item, ind) => {
    return item.weekday;
  });

  const spentAmountDataSet = sampleData.map((item, ind) => {
    return Math.round(item.spentAmount);
  });

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          color: colors.header,
          padding: 5,
          marginHorizontal: 10,
        }}>
        Weekly Expenses
      </Text>
      <LineChart
        data={{
          labels: weekdayLabels,
          datasets: [
            {
              data: spentAmountDataSet,
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9}
        height={220}
        yAxisLabel={currency.symbol}
        yAxisInterval={1} // optional, defaults to 1
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
    </View>
  );
};

export default ExpenseChart;
