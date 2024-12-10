// DivSelectCliente.jsx
import React, { forwardRef, useEffect, useRef } from 'react';

const DivSelectV = forwardRef(({ options = [], icon = 'fas fa-user', placeholder = '', name, id, value, className, required, handleChange }, ref) => {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (input.current && required) {
            input.current.focus();
        }
    }, [required]);

    return (
        <div className="input-group mb-3">
            <span className="input-group-text">
                <i className={icon}></i>
            </span>
            <select
                name={name}
                id={id}
                value={value}
                className={className}
                ref={input}
                required={required}
                onChange={handleChange}
            >
                {options && options.length > 0 ? (
                    options.map((cliente) => (
                        <option value={cliente.id} key={cliente.id}>
                            {cliente.nombre}
                        </option>
                    ))
                ) : (
                    <option value="">No hay clientes disponiblesss</option>
                )}
            </select>
        </div>
    );
});

export default DivSelectV;
