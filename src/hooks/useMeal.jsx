import { useEffect, useState } from "react";

const useMeal = () => {

    const [meal, setMeal] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/meal')
            .then(res => res.json())
            .then(data => {
                setMeal(data)
                setLoading(false)
            })
    }, []);

    return [meal, loading];
};

export default useMeal;