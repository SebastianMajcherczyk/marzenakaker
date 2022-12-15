import React from 'react'
import { useState } from 'react'

export const AdminProductForm = () => {
    const [lang, setLang] = useState('pl')
  return (
    <div>
        <button>Pl</button>
        <form>
          <div>
            <label htmlFor='name'>Nazwa</label>
            <input type='text' placeholder='name' name='name' id='name' />
            </div>
            <div>
              <label htmlFor='description'> Opis</label>
            <textarea type='text' name='description'></textarea>
            </div>
            <div>
            <select></select>
            </div>
            <div>
            <select></select>
            </div>
            <input type='number' placeholder='name' name='name'/>
            <input type='number' placeholder='name' name='name'/>

                {lang ==='pl' && <input />}

        </form>





    </div>
  )
}
