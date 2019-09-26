import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

export default class UploadWarningIcon extends React.PureComponent {
  render () {
    return (
      <Svg width={137} height={137} >
        <G fill='none' fillRule='evenodd'>
          <Path
            d='M125.429 29.969c0-.428-.429-.75-.858-.75-21.535.429-36.321-5.78-45-11.024-5.785-3.532-8.678-6.636-8.678-6.636-.107-.214-.429-.214-.643-.214-.214 0-.429.107-.643.214-.214.107-17.678 18.41-53.786 17.66-.428 0-.857.322-.857.75 0 .214-.643 16.804 5.679 36.711 5.893 18.41 19.178 43.67 49.071 58.975.107.107.215.107.322.107.107 0 .214 0 .321-.107 13.714-7.064 25.179-16.804 33.964-28.899 6-8.241 10.929-17.66 14.358-28.042 7.392-20.871 6.75-38.638 6.75-38.745zm-8.036 38.317c-3.429 10.168-8.25 19.48-14.143 27.614-8.571 11.773-19.714 21.3-33 28.256-29.036-15.091-42.107-39.708-47.893-57.797-5.571-17.232-5.786-32.002-5.678-35.427 32.571.428 50.25-14.45 53.571-17.66 1.179 1.07 3.964 3.532 8.464 6.315 8.786 5.351 23.679 11.56 45.107 11.238 0 3.64-.214 19.266-6.428 37.46z'
            fill='#000'
            fillRule='nonzero'
          />
          <Path
            d='M131.429 22.69c0 .429.321.857.857.857h1.928v1.82c0 .428.322.856.75.856.429 0 .75-.321.857-.75v-2.675c0-.428-.428-.75-.857-.75h-2.678c-.536-.214-.857.215-.857.643zM84.071 12.202c1.393.749 3 1.498 4.5 2.247.108 0 .215.107.322.107.321 0 .643-.214.75-.428.214-.428 0-.856-.429-1.07-1.5-.642-3-1.392-4.393-2.248-.428-.214-.857-.107-1.071.321-.214.428-.107.857.321 1.07zM102.607 19.587c1.607.428 3.214.856 4.822 1.177h.214c.321 0 .75-.214.75-.642.107-.428-.214-.856-.643-.963-1.607-.322-3.214-.75-4.714-1.178-.429-.107-.857.107-.965.535-.107.536.108.964.536 1.07zM122.214 23.119c1.607.107 3.322.214 4.929.32.428 0 .75-.32.857-.748 0-.428-.321-.857-.75-.857-1.607-.107-3.321-.214-4.929-.32-.428 0-.857.32-.857.748 0 .429.322.75.75.857zM79.786 9.74c.107.107.321.107.428.107.322 0 .536-.107.643-.428.214-.428.107-.857-.214-1.07-1.5-.857-2.786-1.82-4.072-2.783a.873.873 0 0 0-1.178.214.87.87 0 0 0 .214 1.177c1.286.856 2.679 1.82 4.179 2.783zM112.357 21.834c1.607.321 3.322.536 4.929.75h.107c.428 0 .75-.322.75-.75.107-.428-.214-.856-.75-.856-1.607-.214-3.322-.428-4.822-.75-.428-.106-.857.215-.964.643 0 .428.322.856.75.963zM93.179 16.483c1.5.642 3.107 1.177 4.714 1.712h.214a.806.806 0 0 0 .75-.535c.107-.428-.107-.856-.536-1.07-1.5-.535-3.107-1.07-4.607-1.713-.428-.214-.857 0-1.071.428-.107.536.107.964.536 1.178zM68.214 3.96a.819.819 0 0 0 .536-.214 19.33 19.33 0 0 0 1.393-1.284c.428.32.857.749 1.5 1.284.321.321.857.214 1.178-.107.322-.321.215-.856-.107-1.177-1.285-1.07-1.928-1.82-1.928-1.82-.107-.214-.322-.214-.536-.214-.214 0-.429.107-.643.214 0 0-.643.642-1.928 1.82-.322.428-.322.856 0 1.284a.819.819 0 0 0 .535.214zM42.393 18.195h.214c1.607-.535 3.214-1.07 4.714-1.712.429-.214.643-.642.429-1.07-.214-.429-.643-.643-1.071-.429-1.5.643-3.108 1.178-4.608 1.713-.428.107-.642.642-.535 1.07.107.214.428.428.857.428zM32 20.229c.107.428.429.642.75.642h.214c1.607-.321 3.215-.75 4.822-1.177.428-.107.643-.535.535-.964-.107-.428-.535-.642-.964-.535-1.607.428-3.214.857-4.714 1.178-.429 0-.75.428-.643.856zM23 20.978c-.429.107-.75.428-.75.856s.429.75.75.75h.107c1.714-.214 3.322-.429 4.929-.75.428-.107.75-.535.643-.963-.108-.428-.536-.75-.965-.642-1.5.321-3.107.535-4.714.75zM18.929 22.262c0-.428-.429-.749-.858-.749-1.607.107-3.214.214-4.928.321-.429 0-.75.428-.75.857 0 .428.428.749.857.749 1.714-.107 3.321-.214 4.929-.321.428-.107.75-.428.75-.857zM51.5 14.556c.107 0 .214 0 .321-.107l4.5-2.247c.429-.214.536-.75.322-1.07-.214-.429-.75-.536-1.072-.322-1.392.75-2.892 1.499-4.392 2.248-.429.214-.536.642-.429 1.07.214.214.536.428.75.428zM60.286 9.847c.107 0 .321 0 .428-.107 1.393-.856 2.893-1.82 4.179-2.783.321-.214.428-.75.214-1.177-.214-.321-.75-.428-1.178-.214a54.5 54.5 0 0 1-4.072 2.782c-.428.214-.536.75-.214 1.07.107.322.321.429.643.429zM5.536 26.116c.428 0 .857-.321.857-.857v-1.82H8.32c.429 0 .858-.32.858-.855a.845.845 0 0 0-.858-.857H5.643c-.429 0-.857.321-.857.75v2.675c-.107.643.214.964.75.964zM7.464 47.094h.107c.429-.107.75-.535.643-.964-.321-1.712-.535-3.425-.75-5.137-.107-.428-.428-.75-.857-.642-.428.107-.75.428-.643.856.215 1.713.536 3.532.75 5.245 0 .428.429.642.75.642zM25.893 96.114c.107 0 .321 0 .428-.107.429-.214.536-.75.215-1.07-.965-1.499-1.822-2.997-2.679-4.496-.214-.428-.75-.535-1.071-.32-.429.213-.536.749-.322 1.07.857 1.498 1.822 3.104 2.786 4.495.107.321.321.428.643.428zM11.75 67.002a.806.806 0 0 0 .75.535h.214c.429-.107.643-.642.536-.964-.536-1.605-1.071-3.318-1.5-5.03-.107-.428-.536-.75-.964-.535-.429.107-.643.535-.536.963.429 1.713.964 3.425 1.5 5.03zM16.143 77.49c.107 0 .214 0 .321-.106.429-.214.643-.643.429-1.07-.643-1.606-1.286-3.212-1.929-4.924-.107-.428-.643-.642-1.071-.428-.429.107-.643.642-.429 1.07.643 1.713 1.286 3.318 1.929 4.923.214.322.536.536.75.536zM6.179 36.712c.428 0 .75-.428.75-.857-.215-1.712-.322-3.532-.429-5.244 0-.428-.429-.75-.857-.75-.429 0-.75.429-.75.857.107 1.712.214 3.532.428 5.244 0 .429.322.75.858.75-.108 0 0 0 0 0zM9.286 51.375c-.107-.428-.536-.75-.965-.642-.428.107-.75.535-.642.963.321 1.713.75 3.425 1.178 5.138.107.32.429.642.75.642h.214c.429-.107.75-.535.643-.963-.428-1.713-.857-3.425-1.178-5.138zM42.929 115.166a.841.841 0 0 0-1.179 0 .84.84 0 0 0 0 1.177c1.286 1.177 2.571 2.462 3.857 3.639a.819.819 0 0 0 .536.214c.214 0 .428-.107.643-.321.321-.321.214-.856-.107-1.177-1.179-1.07-2.465-2.248-3.75-3.532zM35.857 107.566c-.321-.32-.75-.428-1.178-.107-.322.321-.429.75-.108 1.178 1.179 1.391 2.358 2.675 3.536 3.96.107.214.322.214.643.214a.819.819 0 0 0 .536-.214.84.84 0 0 0 0-1.177c-1.179-1.178-2.357-2.57-3.429-3.854zM19.036 81.13c-.215-.428-.643-.535-1.072-.428-.428.214-.535.642-.428 1.07.75 1.605 1.5 3.21 2.357 4.71.107.32.428.427.75.427.107 0 .214 0 .321-.107.429-.214.536-.642.322-1.07-.75-1.391-1.5-2.997-2.25-4.602zM29.429 99.325c-.215-.321-.75-.428-1.072-.214-.321.214-.428.75-.214 1.07a107.58 107.58 0 0 0 3.107 4.282c.107.214.429.32.643.32.214 0 .321-.106.536-.213.321-.322.428-.75.107-1.178-1.072-1.284-2.036-2.676-3.107-4.067zM63.607 131.113c-1.5-.856-3-1.82-4.393-2.783-.321-.214-.857-.107-1.071.215-.214.32-.107.856.214 1.07 1.5.963 3 1.926 4.5 2.783.107.107.322.107.429.107.321 0 .535-.107.643-.428.214-.214.107-.75-.322-.964zM50.75 122.123c-.321-.321-.857-.214-1.179.107-.321.32-.214.856.108 1.177l4.178 3.211c.107.107.322.107.429.107.214 0 .535-.107.643-.321a.87.87 0 0 0-.215-1.177c-1.178-.964-2.571-2.034-3.964-3.104zM72.179 133.682c-.643.321-1.286.75-2.036 1.07-.643-.32-1.286-.749-2.036-1.07-.428-.214-.857-.107-1.071.321-.215.428-.107.856.321 1.07.75.429 1.607.857 2.357 1.285.107.107.215.107.322.107.107 0 .214 0 .321-.107.857-.428 1.607-.856 2.357-1.285.429-.214.536-.749.322-1.07 0-.321-.429-.535-.857-.321zM89.643 122.123l-4.179 3.21c-.321.215-.428.75-.214 1.178.107.214.429.321.643.321.214 0 .321 0 .428-.107 1.393-1.07 2.893-2.14 4.179-3.21.321-.322.429-.75.107-1.178-.107-.428-.643-.428-.964-.214zM105.714 107.46c-.321-.322-.857-.215-1.178.106-1.072 1.285-2.25 2.676-3.429 3.96a.84.84 0 0 0 0 1.178.819.819 0 0 0 .536.214c.214 0 .428-.107.643-.214 1.178-1.284 2.357-2.569 3.535-3.96.322-.535.215-.964-.107-1.285zM122.429 80.702c-.429-.215-.858 0-1.072.428-.75 1.605-1.5 3.21-2.357 4.71-.214.427 0 .855.321 1.07.108.106.215.106.322.106.321 0 .536-.107.75-.428.75-1.498 1.607-3.104 2.357-4.71.321-.427.107-.962-.321-1.176zM117.714 90.12c-.428-.214-.857-.107-1.071.321-.857 1.499-1.822 2.997-2.679 4.496-.214.428-.107.856.215 1.07.107.107.321.107.428.107.214 0 .536-.107.643-.321.964-1.498 1.821-2.997 2.786-4.495.107-.428 0-.964-.322-1.178zM81.179 128.33a61.032 61.032 0 0 1-4.393 2.783c-.429.214-.536.75-.322 1.07.107.215.429.429.643.429.107 0 .322 0 .429-.107 1.5-.964 3-1.82 4.5-2.783.321-.214.428-.75.214-1.07-.214-.536-.75-.536-1.071-.322zM97.464 115.166c-1.285 1.177-2.571 2.461-3.857 3.532-.321.32-.321.856-.107 1.177.107.214.429.321.643.321a.819.819 0 0 0 .536-.214c1.285-1.177 2.678-2.355 3.857-3.639a.84.84 0 0 0 0-1.177c-.215-.321-.75-.321-1.072 0zM126.393 70.962c-.429-.107-.857.107-1.072.428-.642 1.605-1.285 3.318-1.928 4.923-.214.428 0 .857.428 1.07.108 0 .215.108.322.108a.806.806 0 0 0 .75-.536c.643-1.605 1.286-3.317 1.928-4.923.215-.428 0-.856-.428-1.07zM128.643 67.002c.536-1.713 1.071-3.318 1.5-5.03.107-.429-.107-.857-.536-.964-.428-.107-.857.107-.964.535-.429 1.712-.964 3.318-1.5 5.03-.107.429.107.857.536.964h.214a.806.806 0 0 0 .75-.535zM132.929 47.094c.428 0 .75-.321.75-.642.321-1.713.535-3.532.75-5.245.107-.428-.215-.856-.643-.856-.429-.107-.857.214-.857.642-.215 1.712-.536 3.425-.75 5.137-.108.429.214.857.642.964h.108zM131.107 51.375c-.321 1.712-.75 3.425-1.178 5.138-.108.428.107.856.642.963h.215c.321 0 .643-.214.75-.642.428-1.713.857-3.425 1.178-5.138.107-.428-.214-.856-.643-.963-.428-.107-.857.107-.964.642zM134.321 36.712c.429 0 .75-.321.75-.75.215-1.819.322-3.532.429-5.244 0-.428-.321-.856-.75-.856s-.857.32-.857.749c-.107 1.712-.214 3.425-.429 5.244 0 .429.322.75.857.857zM110.964 99.218c-.428.642-.857 1.177-1.285 1.82a34.863 34.863 0 0 1-1.822 2.354c-.321.321-.214.856.107 1.178a.819.819 0 0 0 .536.214c.214 0 .429-.107.643-.322.643-.749 1.178-1.605 1.821-2.461.429-.642.857-1.285 1.286-1.82.214-.32.214-.856-.214-1.07-.322-.321-.857-.214-1.072.107z'
            fill='#000'
          />
          <Path
            d='M1.179 55.656c-.429 0-.858.321-.858.857v14.663c0 .428.322.856.858.856.535 0 .857-.321.857-.856v-14.77c-.107-.429-.429-.75-.857-.75zM1.179 75.136c-.429 0-.858.321-.858.856v4.71c0 .428.322.856.858.856.535 0 .857-.321.857-.856v-4.71c-.107-.535-.429-.856-.857-.856zM135.714 78.24a.845.845 0 0 0-.857-.856c-.428 0-.857.32-.857.856v14.663c0 .428.321.856.857.856.429 0 .857-.32.857-.856V78.24zM134.964 103.285c.429 0 .857-.32.857-.856v-4.71a.845.845 0 0 0-.857-.856c-.428 0-.857.321-.857.857v4.709c0 .535.322.856.857.856zM104.214 123.3a.841.841 0 0 0-1.178 0 .84.84 0 0 0 0 1.177l1.821 1.82a.819.819 0 0 0 .536.214.819.819 0 0 0 .536-.214.84.84 0 0 0 0-1.177l-1.715-1.82zM109.893 129.08a.841.841 0 0 0-1.179 0 .84.84 0 0 0 0 1.177l1.822 1.82a.819.819 0 0 0 .535.214.819.819 0 0 0 .536-.214.84.84 0 0 0 0-1.178l-1.714-1.82zM104.857 129.08l-1.821 1.82a.84.84 0 0 0 0 1.177.819.819 0 0 0 .535.214.819.819 0 0 0 .536-.214l1.822-1.82a.84.84 0 0 0 0-1.177c-.322-.321-.75-.321-1.072 0zM110.536 123.3l-1.822 1.82a.84.84 0 0 0 0 1.177.819.819 0 0 0 .536.214.819.819 0 0 0 .536-.214l1.821-1.82a.84.84 0 0 0 0-1.177c-.214-.321-.75-.321-1.071 0zM104.857 5.352a.819.819 0 0 0 .536.214.819.819 0 0 0 .536-.214.84.84 0 0 0 0-1.178l-1.822-1.82a.841.841 0 0 0-1.178 0 .84.84 0 0 0 0 1.178l1.928 1.82zM110.536 11.131a.819.819 0 0 0 .535.214.819.819 0 0 0 .536-.214.84.84 0 0 0 0-1.177l-1.821-1.82a.841.841 0 0 0-1.179 0 .84.84 0 0 0 0 1.178l1.929 1.82zM103.571 11.345a.819.819 0 0 0 .536-.214l1.822-1.82a.84.84 0 0 0 0-1.177.841.841 0 0 0-1.179 0l-1.821 1.82a.84.84 0 0 0 0 1.177c.321.107.428.214.642.214zM109.357 5.566a.819.819 0 0 0 .536-.214l1.821-1.82a.84.84 0 0 0 0-1.177.841.841 0 0 0-1.178 0L108.82 4.28a.84.84 0 0 0 0 1.178c.108.107.322.107.536.107z'
            fill='#9B9B9B'
          />
          <Path
            d='M11.107 106.817a4.296 4.296 0 0 0 4.286-4.281 4.296 4.296 0 0 0-4.286-4.281 4.296 4.296 0 0 0-4.286 4.28c0 2.463 1.929 4.282 4.286 4.282zm0-6.85c1.393 0 2.572 1.178 2.572 2.569s-1.179 2.569-2.572 2.569-2.571-1.178-2.571-2.57c0-1.39 1.178-2.568 2.571-2.568zM132.393 123.407a4.296 4.296 0 0 0-4.286 4.281 4.296 4.296 0 0 0 4.286 4.282 4.296 4.296 0 0 0 4.286-4.282 4.296 4.296 0 0 0-4.286-4.281zm0 6.85c-1.393 0-2.572-1.177-2.572-2.569 0-1.391 1.179-2.568 2.572-2.568s2.571 1.177 2.571 2.568c.107 1.392-1.071 2.569-2.571 2.569zM128.964 8.99a4.296 4.296 0 0 0 4.286-4.28 4.296 4.296 0 0 0-4.286-4.282 4.296 4.296 0 0 0-4.285 4.281c.107 2.462 1.928 4.282 4.285 4.282zm0-6.85c1.393 0 2.572 1.178 2.572 2.57 0 1.498-1.179 2.568-2.572 2.568s-2.571-1.177-2.571-2.569c0-1.391 1.178-2.568 2.571-2.568z'
            fill='#9B9B9B'
            fillRule='nonzero'
          />
          <Path
            d='M7.679 2.14h15.857c.428 0 .857-.32.857-.856 0-.535-.322-.856-.857-.856H7.679c-.429 0-.858.321-.858.856 0 .536.429.857.858.857zM28.786 2.14h5.143c.428 0 .857-.32.857-.856 0-.535-.322-.856-.857-.856h-5.143c-.429 0-.857.321-.857.856 0 .536.428.857.857.857zM34.786 6.743a.845.845 0 0 0-.857-.856H22.893c-.429 0-.857.32-.857.856 0 .428.321.856.857.856h11.036c.428 0 .857-.32.857-.856zM18.071 7.6c.429 0 .858-.322.858-.857a.845.845 0 0 0-.858-.856h-3.535c-.429 0-.857.32-.857.856 0 .428.321.856.857.856h3.535zM31.25 126.832H15.286c-.429 0-.857.321-.857.856 0 .428.321.857.857.857h15.857c.428 0 .857-.322.857-.857 0-.428-.321-.856-.75-.856zM10.143 126.832H5c-.429 0-.857.321-.857.856 0 .428.321.857.857.857h5.143c.428 0 .857-.322.857-.857-.107-.428-.429-.856-.857-.856zM5 122.979h11.036c.428 0 .857-.321.857-.856a.845.845 0 0 0-.857-.857H5c-.429 0-.857.322-.857.857 0 .535.321.856.857.856zM20 122.23c0 .428.321.856.857.856h3.536c.428 0 .857-.321.857-.856a.845.845 0 0 0-.857-.857h-3.536a.845.845 0 0 0-.857.857z'
            fill='#9B9B9B'
          />
          <Path
            d='M100.143 60.687l-5.679-.535c-.643-3.64-2.035-7.172-4.178-10.168l3.643-4.389a.823.823 0 0 0-.108-1.07l-3.857-3.853a.825.825 0 0 0-1.071-.107L84.5 44.204c-3-2.14-6.536-3.64-10.179-4.174l-.535-5.78c0-.428-.429-.75-.75-.75H67.57a.732.732 0 0 0-.75.75l-.535 5.673c-3.643.642-7.179 2.033-10.179 4.174l-4.393-3.64a.825.825 0 0 0-1.071.108l-3.857 3.853a.823.823 0 0 0-.107 1.07l3.642 4.389c-2.142 2.996-3.642 6.528-4.178 10.168l-5.679.535c-.428 0-.75.428-.75.749v5.458c0 .429.322.75.75.75l5.679.535c.643 3.639 2.036 7.171 4.178 10.168l-3.642 4.388a.823.823 0 0 0 .107 1.07l3.857 3.854a.825.825 0 0 0 1.071.107l4.393-3.64c3 2.141 6.536 3.64 10.179 4.175l.535 5.672c0 .429.429.75.75.75h5.465c.428 0 .75-.321.75-.75l.535-5.672c3.643-.642 7.179-2.034 10.179-4.174l4.393 3.639a.825.825 0 0 0 1.071-.107l3.857-3.854a.823.823 0 0 0 .108-1.07l-3.643-4.388c2.143-2.997 3.643-6.53 4.178-10.168l5.679-.535c.428 0 .75-.428.75-.75V61.33c0-.214-.322-.535-.75-.642zm-.857 5.565l-5.572.535c-.321 0-.643.322-.75.643a22.638 22.638 0 0 1-4.393 10.596c-.214.32-.214.749 0 .963l3.536 4.388-2.893 2.89-4.393-3.532c-.321-.214-.75-.214-.964 0a22.687 22.687 0 0 1-10.607 4.388c-.321 0-.643.322-.643.75l-.536 5.565H68l-.321-5.672c0-.321-.322-.643-.643-.75a22.687 22.687 0 0 1-10.607-4.388c-.322-.214-.75-.214-.965 0l-4.393 3.532-2.892-2.89 3.535-4.388c.215-.321.215-.75 0-.963a22.638 22.638 0 0 1-4.393-10.596c0-.321-.321-.643-.75-.643L41 66.145v-3.96l5.571-.535c.322 0 .643-.321.75-.642a22.638 22.638 0 0 1 4.393-10.596c.215-.321.215-.75 0-.964L48.18 45.06l2.892-2.89 4.393 3.532c.322.214.75.214.965 0a22.687 22.687 0 0 1 10.607-4.388c.321 0 .643-.321.643-.75L68.214 35h4.072l.535 5.566c0 .32.322.642.643.75 3.857.534 7.5 2.033 10.607 4.387.322.214.75.214.965 0l4.393-3.532 2.892 2.89-3.535 4.388c-.215.322-.215.75 0 .964a22.638 22.638 0 0 1 4.393 10.596c0 .32.321.642.75.642l5.571.535v4.067h-.214z'
            fill='#FF4086'
            fillRule='nonzero'
          />
          <Path
            d='M70.25 47.522c-9.214 0-16.714 7.492-16.714 16.697 0 9.204 7.5 16.697 16.714 16.697 9.214 0 16.714-7.493 16.714-16.697 0-9.205-7.5-16.697-16.714-16.697zm0 31.788c-8.357 0-15.107-6.743-15.107-15.091 0-8.349 6.75-15.092 15.107-15.092S85.357 55.87 85.357 64.22c0 8.348-6.857 15.091-15.107 15.091z'
            fill='#FF4086'
            fillRule='nonzero'
          />
        </G>
      </Svg>
    )
  }
}