import React from 'react';
import { ScrollView } from 'react-native';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

import { styles } from './styles';

type CategorySelecteTypeProps = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hashCheckBox?: boolean;
};

export function CategorySelect({
  categorySelected,
  setCategory,
  hashCheckBox = false,
}: CategorySelecteTypeProps) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map((category) => (
        <Category
          hashCheckBox={hashCheckBox}
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === categorySelected}
          onPress={() => setCategory(category.id)}
        />
      ))}
    </ScrollView>
  );
}
