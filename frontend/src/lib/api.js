import api from "./axios"

export const syncUser=async(userData)=>{
    try {
        console.log("🟡 Sending sync request with data:", userData);
        const { data } = await api.post("/user/sync", userData);
        console.log("🟢 Response from user sync: ", data);
        return data;
    } catch (error) {
        console.error("🔴 Error in syncUser:", error);
        console.error("🔴 Error response:", error.response?.data);
        console.error("🔴 Error status:", error.response?.status);
        throw error; 
    }
}

export const getAllProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getMyproducts=async()=>{
    const {data}=await api.get("/prducts/my")
    return data
}

export const getProductById=async(id)=>{
    const {data}=await api.get(`/products/${id}`)
    return data
}

export const createProduct=async(productdata)=>{
    const {data}=await api.post("/products",productdata)
    return data
}

export const updateProduct=async({id,...updatedData})=>{
    const {data}=await api.put(`/products/${id}`,updatedData)
    return data
}

export const deleteProduct=async(id)=>{
        const {data}=await api.delete(`/products/${id}`)
}

export const createComment=async({productId,content})=>{
    const {data}=await api.post(`/comments/${productId}`,{content})
    return data
}

export const DeleteComment=async({commentId})=>{
    const {data}=await api.delete(`/comments/${commentId}`)
    return data
}