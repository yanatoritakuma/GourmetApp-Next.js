type ShopObj = {
  id: string;
  name: string;
  station_name: string;
  access: string;
  address: string;
  budget: {
    average: string;
  };
  catch: string;
  close: string;
  coupon_urls: {
    pc: string;
    sp: string;
  };
  genre: {
    name: string;
    catch: string;
  };
  photo: {
    mobile: {
      l: string;
      s: string;
    };
  };
  urls: {
    pc: string;
  };
};

export type HotpepperResponseType = {
  data: {
    results: {
      results_available: number;
      results_start: number;
      results_returned: string;
      shop: ShopObj[];
    };
  };
};
