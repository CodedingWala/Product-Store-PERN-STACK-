import React from 'react'
import api from '../lib/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createProduct, deleteProduct, getAllProducts, getMyproducts, getProductById, updateProduct } from '../lib/api'

export const useProducts = () => {
  const result = useQuery({ queryKey: ["products"], queryFn: getAllProducts });
  return result;
};

export const useCreateProduct = () => {
  return useMutation({ mutationFn: createProduct })
}


export const useProduct = (id) => {
  const data = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id
  })
  console.log("data: ", data)
  return data
}

export const useDeleteProduct = (id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Myproduct"] })
    }
  })
}


export const useMyProduct = () => {
  return useQuery({ queryKey: ["Myproduct"], queryFn: getMyproducts })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, Variable) => {
      queryClient.invalidateQueries({ queryKey: ["Myproduct"] })
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", Variable.id] })
    }
  })
}