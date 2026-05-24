
import { useState , useEffect } from "react";
import { GetProductCategorieList } from "../api/product";


const useProductCategoryList = () => {
     const [list, setList] = useState<string[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<unknown>(null);

     useEffect(() => {
        const fetchProductCategoriesList = async () => {
            setLoading(true);
            try {
                const res = await GetProductCategorieList();
                setList(res);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductCategoriesList();
     }, []);
     return { list, loading, error };
};

export default useProductCategoryList;