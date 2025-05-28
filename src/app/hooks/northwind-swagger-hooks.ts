import { useCallback, useEffect, useState } from 'react';
import { CustomerDto } from '../models/NorthwindSwagger/customer-dto';
import { CustomerDtoPagedResultDto } from '../models/NorthwindSwagger/customer-dto-paged-result-dto';
import { deleteCustomerDto, getCustomerDto, getCustomerDtoList, getCustomerDtoPagedResultDto, getOrderDtoList, getProductDtoList, postCustomerDto, putCustomerDto } from '../services/northwind-swagger';
import { OrderDto } from '../models/NorthwindSwagger/order-dto';
import { ProductDto } from '../models/NorthwindSwagger/product-dto';

export const useGetCustomerDtoList = () => {
  const [customerDto, setCustomerDto] = useState<CustomerDto[]>([]);

  const requestCustomerDto = useCallback(() => {
    let ignore = false;
    getCustomerDtoList()
      .then((data) => {
        if (!ignore) {
          setCustomerDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestCustomerDto();
  }, [requestCustomerDto]);

  return { requestNorthwindSwaggerCustomerDto: requestCustomerDto, northwindSwaggerCustomerDto: customerDto, setNorthwindSwaggerCustomerDto: setCustomerDto };
}

export const useGetCustomerDtoPagedResultDto = (pageIndex: any, size: any, orderBy: any) => {
  const [customerDtoPagedResultDto, setCustomerDtoPagedResultDto] = useState<CustomerDtoPagedResultDto | undefined>();

  const requestCustomerDtoPagedResultDto = useCallback(() => {
    let ignore = false;
    getCustomerDtoPagedResultDto(pageIndex, size, orderBy)
      .then((data) => {
        if (!ignore) {
          setCustomerDtoPagedResultDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [pageIndex, size, orderBy]);

  useEffect(() => {
    requestCustomerDtoPagedResultDto();
  }, [pageIndex, size, orderBy, requestCustomerDtoPagedResultDto]);

  return { requestNorthwindSwaggerCustomerDtoPagedResultDto: requestCustomerDtoPagedResultDto, northwindSwaggerCustomerDtoPagedResultDto: customerDtoPagedResultDto, setNorthwindSwaggerCustomerDtoPagedResultDto: setCustomerDtoPagedResultDto };
}

export const usePostCustomerDto = (data: any) => {
  const [customerDto, setCustomerDto] = useState<CustomerDto | undefined>();

  const requestCustomerDto = useCallback(() => {
    let ignore = false;
    postCustomerDto(data)
      .then((data) => {
        if (!ignore) {
          setCustomerDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [data]);

  useEffect(() => {
    requestCustomerDto();
  }, [data, requestCustomerDto]);

  return { requestNorthwindSwaggerCustomerDto: requestCustomerDto, northwindSwaggerCustomerDto: customerDto, setNorthwindSwaggerCustomerDto: setCustomerDto };
}

export const usePutCustomerDto = (data: any) => {
  const [customerDto, setCustomerDto] = useState<CustomerDto | undefined>();

  const requestCustomerDto = useCallback(() => {
    let ignore = false;
    putCustomerDto(data)
      .then((data) => {
        if (!ignore) {
          setCustomerDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [data]);

  useEffect(() => {
    requestCustomerDto();
  }, [data, requestCustomerDto]);

  return { requestNorthwindSwaggerCustomerDto: requestCustomerDto, northwindSwaggerCustomerDto: customerDto, setNorthwindSwaggerCustomerDto: setCustomerDto };
}

export const useDeleteCustomerDto = (id: any) => {
  const [customerDto, setCustomerDto] = useState<CustomerDto | undefined>();

  const requestCustomerDto = useCallback(() => {
    let ignore = false;
    deleteCustomerDto(id)
      .then((data) => {
        if (!ignore) {
          setCustomerDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [id]);

  useEffect(() => {
    requestCustomerDto();
  }, [id, requestCustomerDto]);

  return { requestNorthwindSwaggerCustomerDto: requestCustomerDto, northwindSwaggerCustomerDto: customerDto, setNorthwindSwaggerCustomerDto: setCustomerDto };
}

export const useGetCustomerDto = (id: any) => {
  const [customerDto, setCustomerDto] = useState<CustomerDto | undefined>();

  const requestCustomerDto = useCallback(() => {
    let ignore = false;
    getCustomerDto(id)
      .then((data) => {
        if (!ignore) {
          setCustomerDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [id]);

  useEffect(() => {
    requestCustomerDto();
  }, [id, requestCustomerDto]);

  return { requestNorthwindSwaggerCustomerDto: requestCustomerDto, northwindSwaggerCustomerDto: customerDto, setNorthwindSwaggerCustomerDto: setCustomerDto };
}

export const useGetOrderDtoList = (id: any) => {
  const [orderDto, setOrderDto] = useState<OrderDto[]>([]);

  const requestOrderDto = useCallback(() => {
    let ignore = false;
    getOrderDtoList(id)
      .then((data) => {
        if (!ignore) {
          setOrderDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [id]);

  useEffect(() => {
    requestOrderDto();
  }, [id, requestOrderDto]);

  return { requestNorthwindSwaggerOrderDto: requestOrderDto, northwindSwaggerOrderDto: orderDto, setNorthwindSwaggerOrderDto: setOrderDto };
}

export const useGetProductDtoList = (id: any) => {
  const [productDto, setProductDto] = useState<ProductDto[]>([]);

  const requestProductDto = useCallback(() => {
    let ignore = false;
    getProductDtoList(id)
      .then((data) => {
        if (!ignore) {
          setProductDto(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, [id]);

  useEffect(() => {
    requestProductDto();
  }, [id, requestProductDto]);

  return { requestNorthwindSwaggerProductDto: requestProductDto, northwindSwaggerProductDto: productDto, setNorthwindSwaggerProductDto: setProductDto };
}
