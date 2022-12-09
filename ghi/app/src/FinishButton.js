import React, { useState } from 'react';

const FinishButton = (props) => {

    const [finish, setFinish] = useState(false);

    const onClick = (e) => {

        e.preventDefault();
        setFinish('test')

    }

    return (<>
        <input value={this.state.finish} name="finish"/>
        <button onClick={onClick}>Finish</button>
      </>)


}
