import React from "react";
import _ from "lodash";
import ExtendedFlatList from "./UI/ExtendedFlatList";
import FlyerItemColumn2 from "./FlyerItemColumn2";

const ProductList = ({
  products,
  userStore,
  styles,
  loadMore,
  popupHandler,
  afterAddWishItem,
  afterDeleteWishItem,
  name,
}) => {
  if (
    _.isEmpty(products) ||
    _.isEmpty(products.productList) ||
    _.isEmpty(userStore)
  )
    return <></>;
  return (
    <ExtendedFlatList
      listKey={`${name}-ProductList-${userStore.storeInfo.store_cd}`}
      columnWrapperStyle={styles.flyerListColumnWrapperStyle}
      style={[styles.flyerListStyle]}
      onEndReached={loadMore}
      numColumns={2}
      data={products.productList}
      keyExtractor={(item, index) => {
        `${name}-ProductList-${userStore.storeInfo.store_cd}-${item.product_cd}`;
      }}
      renderItem={(itemData) => (
        <FlyerItemColumn2
          onPress={popupHandler.bind(this, itemData.item)}
          item={itemData.item}
          afterAddWishItem={afterAddWishItem}
          afterDeleteWishItem={afterDeleteWishItem}
        />
      )}
    />
  );
};

export default React.memo(ProductList);
