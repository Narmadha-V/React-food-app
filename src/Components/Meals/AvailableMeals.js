import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
  const [meals,setMeals] =useState([]);
  const [isLoading,setIsLoading] =useState(true);
  const [httpError,setHttpError] =useState()
 useEffect(()=>{
  const fetchMeals = async ()=>{
    const response = await fetch('https://newapp-f341f-default-rtdb.firebaseio.com/meals.json');
    if(!response.ok){
     throw new Error ('Something went Wrong')
    }
    const responseData= await response.json()
    const loadesMeals =[];
    for (const key in responseData){
      loadesMeals.push({
        id: key,
        name:responseData[key].name,
        description:responseData[key].description,
        price:responseData[key].price

      })
    }
    setMeals(loadesMeals)
    setIsLoading(false)
  }

 
    fetchMeals().then().catch(error =>{
      setIsLoading(false)
      setHttpError(error.message)
    })

 
 },[])
 if(isLoading){
  return(
    <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  )
 }
 if(httpError){
  return(
    <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  )
 }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;