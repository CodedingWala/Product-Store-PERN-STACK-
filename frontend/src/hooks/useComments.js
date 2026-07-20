import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createComment, DeleteComment } from "../lib/api"
import { Variable } from "lucide-react"


export const useCreateComment=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:createComment,
        onSuccess:(_,Variable)=>{
            queryClient.invalidateQueries({queryKey:["product",Variable.productId]})
        }
    })

    
}

export const useDeleteComment=(productId)=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:DeleteComment,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["product",productId]})
        }
    })
}