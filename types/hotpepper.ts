type ShopObj = {
  id: string;
  name: string;
  station_name: string;
  genre: {
    name: string;
    catch: string;
  };
};

export type HotpepperResponseType = {
  data: {
    results: {
      shop: ShopObj[];
    };
  };
};
