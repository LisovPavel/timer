import React, {FC} from 'react';

export const Btn: FC = (props) => {
    return (
        <button {...props} className="px-4 py-2 rounded-full bg-blue-100 color-red-400 drop-shadow-sm hover:drop-shadow-2xl" />
    );
};
