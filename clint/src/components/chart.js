import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../App.css';





 const ChartComponent=() => {
    const [buildings,setBuldings]=useState([]);

    const data = [


        {
          name: 'ALMujama',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },

      ];
    useEffect(()=>{
        fetch('http://localhost:5000/api/employee/getBuldings',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setBuldings(result);
            console.log(result);
        })
     },[])
    return (
        <BarChart
          width={700}
          height={300}
          data={data}
          className='chart'
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      );

 };

 export default ChartComponent;




