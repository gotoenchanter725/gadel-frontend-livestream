export const actions = {
  SET_STOMP_CLIENT: 'SET_STOMP_CLIENT',
  SET_CHAT_CLIENT: 'SET_CHAT_CLIENT',
  SET_SELL_STOMP_CLIENT: 'SET_SELL_STOMP_CLIENT',
  SET_BUY_STOMP_CLIENT: 'SET_BUY_STOMP_CLIENT',
  SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
  SET_SELL_OFFERS_QUEUE: 'SET_SELL_OFFERS_QUEUE',
  SET_BUY_OFFERS_QUEUE: 'SET_BUY_OFFERS_QUEUE',
  SET_USERNAME: 'SET_USERNAME',
  SET_PAYMENT_FILTERS: 'SET_PAYMENT_FILTERS',
  SET_FINGERPRINT: 'SET_FINGERPRINT',
  SET_UUID: 'SET_UUID',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_USER: 'SET_USER',
  SET_KYC_STATUS: 'SET_KYC_STATUS',
  SET_PENDING_SELL_ORDER: 'SET_PENDING_SELL_ORDER',
  SET_PENDING_BUY_ORDER: 'SET_PENDING_BUY_ORDER',
  SET_CHAT_ID: 'SET_CHAT_ID',
  SET_CHAT: 'SET_CHAT'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_PENDING_SELL_ORDER:
      return {
        ...state,
        pendingSellOrder: action.payload
      };
    case actions.SET_CHAT_ID:
      return {
        ...state,
        chatId: action.payload
      };
    case actions.SET_CHAT:
      return {
        ...state,
        chat: action.payload
      };
    case actions.SET_PENDING_BUY_ORDER:
      return {
        ...state,
        pendingBuyOrder: action.payload
      };
    case actions.SET_STOMP_CLIENT:
      return {
        ...state,
        stompClient: action.payload
      };
    case actions.SET_CHAT_CLIENT:
      return {
        ...state,
        chatClient: action.payload
      };
    case actions.SET_SELL_STOMP_CLIENT:
      return {
        ...state,
        sellStompClient: action.payload
      };
    case actions.SET_BUY_STOMP_CLIENT:
      return {
        ...state,
        buyStompClient: action.payload
      };
    case actions.SET_ACCESS_TOKEN:
      return {
        ...state,
        access_token: action.payload
      };
    case actions.SET_SELL_OFFERS_QUEUE:
      return {
        ...state,
        sellOffersQueue: action.payload
      };
    case actions.SET_BUY_OFFERS_QUEUE:
      return {
        ...state,
        buyOffersQueue: action.payload
      };
    case actions.SET_USERNAME:
      return {
        ...state,
        username: action.payload
      };
    case actions.SET_PAYMENT_FILTERS:
      return {
        ...state,
        paymentFilters: action.payload
      };
    case actions.SET_FINGERPRINT:
      return {
        ...state,
        fingerprint: action.payload
      };
    case actions.SET_UUID:
      return {
        ...state,
        uuid: action.payload
      };
    case actions.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload
      };
    case actions.SET_KYC_STATUS:
      return {
        ...state,
        kycStatus: action.payload
      };
    case actions.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
