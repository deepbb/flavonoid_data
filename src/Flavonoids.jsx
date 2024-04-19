import React, { useEffect, useState } from 'react'
import Data from "./utility/Wine-Data.json"

export default function Flavonoids() {
    const [flavonoids, setFlavonoids] = useState([]);
    const [alcoholGroups, setAlcoholGroups] = useState([]);
    const [medianValues, setMedianValues] = useState([])
    const [gammaval,setGammaval]  = useState({})

    useEffect(() => {
        // Calculate statistics when component mounts
        const newStatistics = Data.map(item => ({
            item: item.Flavanoids,
            Alcohol: item.Alcohol,
            Hue:item.Hue,
            Magnesium:item.Magnesium,
            Ash:item.Ash
        }));

        // setStatistics(newStatistics);
        setFlavonoids(newStatistics);
        customFunction(flavonoids)
    }, [flavonoids]);



    const customFunction = (flavonoids) => {

        // Group flavonoids by alcohol property
        const groupedByAlcohol = {};
        flavonoids.forEach((flavo) => {
            const alcohol = flavo.Alcohol;
            if (!groupedByAlcohol[alcohol]) {
                groupedByAlcohol[alcohol] = [];
            }
            groupedByAlcohol[alcohol].push(flavo);
        });

        // Calculate mean for each group
        const meanValues = {};
        for (const alcohol in groupedByAlcohol) {
            const sum = groupedByAlcohol[alcohol].reduce((acc, flavo) => acc + parseFloat(flavo.item), 0);
            const mean = sum / groupedByAlcohol[alcohol].length;
            meanValues[alcohol] = mean;
            // console.log(`Mean value for Alcohol ${alcohol}:`, mean);
        }
        setAlcoholGroups(meanValues);


        // Calculate median for each group
        const medianValues = {};
        for (const alcohol in groupedByAlcohol) {
            const sortedFlavonoids = groupedByAlcohol[alcohol].map(flavo => parseFloat(flavo.item)).sort((a, b) => a - b);
            const mid = Math.floor(sortedFlavonoids.length / 2);
            const median = sortedFlavonoids.length % 2 === 0 ? (sortedFlavonoids[mid - 1] + sortedFlavonoids[mid]) / 2 : sortedFlavonoids[mid];
            medianValues[alcohol] = median;
            // console.log(`Median value for Alcohol ${alcohol}:`, median);
        }
        setMedianValues(medianValues)

        flavonoids.forEach((flavo) => {
            const gamma = (flavo.Ash * flavo.Hue) / flavo.Magnesium;
            flavo.Gamma = gamma;
            // console.log("GAMMA",gamma);
        });

        
    // Group flavonoids by alcohol property
    const groupeByAlcohol = {};
    flavonoids.forEach((flavo) => {
        const alcohol = flavo.Alcohol;
        if (!groupeByAlcohol[alcohol]) {
            groupeByAlcohol[alcohol] = [];
        }
        groupeByAlcohol[alcohol].push(flavo);
    });

     // Calculate mean, median, and mode of Gamma for each group
     const gammaStatistics = {};
     for (const alcohol in groupeByAlcohol) {
         const gammaValues = groupeByAlcohol[alcohol].map(flavo => flavo.Gamma);
         const sum = gammaValues.reduce((acc, val) => acc + val, 0);
         const mean = sum / gammaValues.length;
         
         const sortedGammaValues = gammaValues.sort((a, b) => a - b);
         const mid = Math.floor(sortedGammaValues.length / 2);
         const median = sortedGammaValues.length % 2 === 0 ? (sortedGammaValues[mid - 1] + sortedGammaValues[mid]) / 2 : sortedGammaValues[mid];
 
         const modeMap = {};
         let maxCount = 0;
         let mode;
         gammaValues.forEach((value) => {
             if (!modeMap[value]) modeMap[value] = 0;
             modeMap[value]++;
             if (modeMap[value] > maxCount) {
                 maxCount = modeMap[value];
                 mode = value;
             }
         });
 
         gammaStatistics[alcohol] = {
             mean: mean,
             median: median,
             mode: mode
         };
        
     }
    
    //  console.log("Gamma Statistics:", gammaStatistics);
     setGammaval(gammaStatistics);
   };

    const renderRows = () => {
        return (
            <>
                <tr style={{ border: '2px solid black' }}>
                    <td style={{ border: '2px solid black',width:200 }}>Flavonoid Mean</td>
                    <td style={{ border: '2px solid black' }}>{alcoholGroups['1']?.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{alcoholGroups['2']?.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{alcoholGroups['3']?.toFixed(3)}</td>



                </tr>
                <tr style={{ border: '2px solid black' }}>
                    <td style={{ border: '2px solid black' }}>Flavonoid Median</td>
                    <td style={{ border: '2px solid black' }}>{medianValues['1']}</td>
                    <td style={{ border: '2px solid black' }}>{medianValues['2']}</td>
                    <td style={{ border: '2px solid black' }}>{medianValues['3']}</td>
                </tr>
                <tr style={{ border: '2px solid black' }}>
                    <td style={{ border: '2px solid black' }}>Flavonoid Mode</td>
                    <td style={{ border: '2px solid black' }}>{medianValues['1']}</td>
                    <td style={{ border: '2px solid black' }}>{medianValues['2']}</td>
                    <td style={{ border: '2px solid black' }}>{medianValues['3']}</td>
                </tr>
            </>
        );
    };
    const renderGamma = () => {
        return (
            <>
                <tr style={{ border: '2px solid black'}}>
                    <td style={{ border: '2px solid black',width:200 }}>Gamma Mean</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[1]?.mean.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[2]?.mean.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[3]?.mean.toFixed(3)}</td>



                </tr>
                <tr style={{ border: '2px solid black' }}>
                    <td style={{ border: '2px solid black' }}>Gamma Median</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[1]?.median.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[2]?.median.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[3]?.median.toFixed(3)}</td>
                </tr>
                <tr style={{ border: '2px solid black' }}>
                    <td style={{ border: '2px solid black' }}>Gamma Mode</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[1]?.mode.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[1]?.mode.toFixed(3)}</td>
                    <td style={{ border: '2px solid black' }}>{gammaval[1]?.mode.toFixed(3)}</td>
                </tr>
            </>
        );
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection:"column",
            justifyContent: 'center',
            alignItems: 'center',
            gap:50,
            height:800,
            textAlign:'center'
        }}>
              <h2>Flavonoids Mean Values</h2>
            
            <table style={{ borderCollapse: 'collapse', width: '50%',height:300 }}>
          
                <thead>
                    <tr>
                        <th style={{ border: '2px solid black',height:50 }}></th>
                        <th style={{ border: '2px solid black',height:50 }}>Class 1</th>
                        <th style={{ border: '2px solid black',height:50 }}>Class 2</th>
                        <th style={{ border: '2px solid black',height:50 }}>Class 3</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
            <h2>Gamma Mean Values</h2>
            <table style={{ borderCollapse: 'collapse', width: '50%',height:300 }}>
                <thead>
                    <tr>
                        <th style={{ border: '2px solid black',height:50 }}></th>
                        <th style={{ border: '2px solid black',height:50 }}>Class 1</th>
                        <th style={{ border: '2px solid black',height:50 }}>Class 2</th>
                        <th style={{ border: '2px solid black',height:50 }}>Class 3</th>
                    </tr>
                </thead>
                <tbody>
                    {renderGamma()}
                </tbody>
            </table>
            
        </div>
    )
}
