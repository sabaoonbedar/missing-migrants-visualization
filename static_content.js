// --------------------------------------------------
// TODO 1.2 and 1.4
// --------------------------------------------------

// TODO 1.4: Accept the data by declaring a variable that will contain the data like this: 
// const Introduction = ({your variable name here}) => {...}
const Introduction = () => {

    // TODO 1.2: Declare a variable which contains your intro text by writing: const introText = "your text here";

    
    // TODO 1.2: Add a div element which wraps the text "Description" inside the returned react fragment <> </>
    // TODO 1.2: Insert a line break using <br/> after the Description text
    // TODO 1.2: Add the className attribute to the diff with the value "introTitle". You can do this as follows
    // <div className="introTitle">
    // TODO 1.2: Add another div with className "intro". This div wraps dynamic text. For this we will simply enter
    // the introText variable we specified before inside the div but to make sure that it will show the 
    // text inside the variable and not the name of the variable we have to wrap it in curly braces.
    // TODO 1.4: Modify the text above with your data metrics. Individual strings can be added together using the + operator for example
    // "hello " + "everyone" will give you "hello everyone". This also works with a string and a number.

    // This returns the html elements which should be created by this component. A react fragment is required because
    // multiple elements are used.
    return (
        <>
        </>
        )
};


// --------------------------------------------------
// TODO 1.5 (World Sphere and Graticule)
// --------------------------------------------------

// TODO 1.5: define a projection, such as d3.geoNaturalEarth1 or d3.geoEquirectangular (see the documentation, there are many choices)
// TODO 1.5: define a path generator using d3.geoPath that will use the given projection method
// TODO 1.5: generate the lon/lat grid lines, using d3.geoGraticule

const WorldGraticule = ({width, height}) => (
    // TODO 4.2: Memoization for sphere and graticules
    // TODO 1.5: add className worldGraticule to style with information from css to the g tag
    <g>
        
        // TODO 1.5: remove the rectangle placeholder
        <rect width={width} height={height} fill="none" stroke="#1b9e77" strokeWidth="3"/>
        <>
            // TODO 1.5: draw a sphere under the projection. The function "path" applies the projection which is simply inserted in the d attribute of path.
            
            // TODO 1.5: draw the graticule by creating a path element similar to what you did before
        </>
        
    </g>
);

// --------------------------------------------------
// TODO 2.1 
// --------------------------------------------------

// the data we work on is composed of land and interiors (use destructuring)
const Countries = ({ 
    worldAtlas: {land, interiors}, 
}) => 
(
    // TODO 2.1: delete the following line
    <div>Placeholder</div>
    // TODO 4.2: Memoization for land and interiors
    // TODO 2.1: create a group with class name countries for styling that wraps the following JS scope
        // TODO 2.1: enter a JS scope inside the group element (everything that follows will be in curly braces)
            // TODO 2.1: create a react fragment
                // TODO 2.1: inside the fragment enter another JS scope
                    // TODO 2.1: map the land features to path elements that draw the land masses (styling will make sure the paths are filled with the correct color)
                // TODO: 2.1: draw another path for the interiors
);
