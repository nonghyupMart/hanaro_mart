const ProductList = (props) => {
  return (
    <ExtendedFlatList
      onEndReached={loadMore}
      columnWrapperStyle={{
        justifyContent: "space-between",
        alignItems: "space-between",
        paddingLeft: 19,
        paddingRight: 19,
      }}
      numColumns={3}
      style={{ flexGrow: 1, flex: 1, width: "100%", marginTop: 10 }}
      data={product.productList}
      keyExtractor={(item, index) => {
        `${Math.random()}`;
      }}
      // keyExtractor={(item) => item.product_cd + ""}
      renderItem={(itemData) => (
        <FlyerItem
          onPress={popupHandler.bind(this, itemData.item)}
          item={itemData.item}
        />
      )}
    />
  );
};

export default ProductList;
