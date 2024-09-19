import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import BasketModal from './components/basket-modal';
import BasketList from './components/basket-list';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().list;
  // добавить данные для корзины

  // добавить новые колбэки, но сначала изменить store
  const callbacks = {
    onDeleteItem: useCallback(
      code => {
        store.deleteItem(code);
      },
      [store],
    ),
    onAddItem: useCallback(() => {
      store.addItem(); 
      // все должно добавляться в корзину, а не list
    }, [store]),
    goBasket: useCallback(() => {
      // открыть модалку
    }),
  };
  
  // многие вещи переименовал! не забудь

  return (
    <PageLayout>
      <Head title="Магазин"/>
      {/* не знаю, как сделать */}
      <Controls onBasket={callbacks.goBasket} />
      <List
        list={list}
        onAddItem={callbacks.onAddItem}
      />
      <BasketModal onClose={callbacks.onCloseBasket}>
        <Head title="Корзина"/>
        <BasketList 
          list={basket}
          onDeleteItem={callbacks.onDeleteItem}
        />
      </BasketModal>
    </PageLayout> 
  );
}

export default App;
