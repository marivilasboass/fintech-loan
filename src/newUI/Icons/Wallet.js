
import React, { PureComponent } from 'react'
import { Svg } from 'expo'

import Colors from '../Colors'

export default class Wallet extends PureComponent {
  static defaultProps = {
    color: Colors.nightRider
  }

  render () {
    const { color, width, height, ...props } = this.props
    return (
      <Svg width={width || 187} height={height || 184} viewBox='0 0 187 184' {...props}>
        <Svg.G fillRule='evenodd' fill='none'>
          <Svg.Path d='M13.16 58.634c-.644 0-1.127.486-1.127 1.135v19.295c0 .648.483 1.135 1.127 1.135s1.127-.487 1.127-1.135V59.93c0-.81-.483-1.297-1.127-1.297zm0 25.618c-.644 0-1.127.487-1.127 1.135v6.161c0 .649.483 1.135 1.127 1.135s1.127-.486 1.127-1.135v-6.16c0-.65-.483-1.136-1.127-1.136zM9.113 133.294c-3.381 0-6.119 2.757-6.119 6.162s2.738 6.161 6.12 6.161c3.38 0 6.118-2.756 6.118-6.161s-2.737-6.162-6.119-6.162zm0 9.89c-2.093 0-3.703-1.62-3.703-3.728s1.61-3.73 3.703-3.73 3.704 1.622 3.704 3.73c0 2.107-1.61 3.729-3.704 3.729zM39.58 21.666H16.876c-.644 0-1.127.486-1.127 1.135 0 .648.483 1.135 1.127 1.135H39.58c.644 0 1.127-.487 1.127-1.135 0-.649-.483-1.135-1.127-1.135zm-37.518 2.27H9.47c.644 0 1.127-.487 1.127-1.135 0-.649-.483-1.135-1.127-1.135H2.062c-.644 0-1.127.486-1.127 1.135-.16.648.483 1.135 1.127 1.135zm0 7.944h15.78c.644 0 1.127-.486 1.127-1.135 0-.648-.483-1.134-1.127-1.134H2.062c-.644 0-1.127.486-1.127 1.134-.16.65.483 1.135 1.127 1.135zm27.696-2.432h-5.153c-.644 0-1.127.487-1.127 1.135 0 .649.483 1.135 1.127 1.135h5.153c.644 0 1.127-.486 1.127-1.135.16-.648-.483-1.135-1.127-1.135zm101.445 149.188h22.704c.644 0 1.127-.486 1.127-1.135s-.483-1.135-1.127-1.135h-22.704c-.644 0-1.127.486-1.127 1.135-.16.649.483 1.135 1.127 1.135zm38.645-1.135c0-.649-.483-1.135-1.127-1.135h-7.407c-.644 0-1.127.486-1.127 1.135s.483 1.135 1.127 1.135h7.407c.644 0 1.127-.486 1.127-1.135zm-16.907-6.648h15.78c.644 0 1.127-.486 1.127-1.135 0-.648-.483-1.135-1.127-1.135h-15.78c-.644 0-1.127.487-1.127 1.135-.161.487.483 1.135 1.127 1.135zm-12.076 0h5.152c.644 0 1.127-.486 1.127-1.135 0-.648-.483-1.135-1.127-1.135h-5.152c-.644 0-1.127.487-1.127 1.135 0 .487.483 1.135 1.127 1.135zm-76.088 3.733c.16.162.483.324.805.324.322 0 .644-.162.805-.324.483-.486.483-1.297 0-1.621l-2.577-2.594c-.483-.487-1.288-.487-1.61 0-.483.486-.483 1.297 0 1.62l2.577 2.595zm7.567 4.216c-.483-.487-1.288-.487-1.61 0-.483.486-.483 1.297 0 1.621l2.577 2.595c.16.162.483.324.805.324.322 0 .644-.162.805-.324.483-.487.483-1.298 0-1.622l-2.577-2.594zm-8.534 4.216l2.577-2.595c.483-.486.483-1.297 0-1.621-.483-.487-1.288-.487-1.61 0l-2.577 2.594c-.483.487-.483 1.297 0 1.622.161.162.483.324.805.324.322 0 .644 0 .805-.324zm9.34-12.647l-2.577 2.594c-.483.486-.483 1.297 0 1.621.161.162.483.324.805.324.322 0 .644-.162.805-.324l2.577-2.594c.483-.486.483-1.297 0-1.621-.322-.487-1.127-.487-1.61 0zM78.484 4.296a.885.885 0 0 0 .58.234.885.885 0 0 0 .581-.234.917.917 0 0 0 0-1.282L77.787 1.15a.909.909 0 0 0-1.278 0 .917.917 0 0 0 0 1.282l1.975 1.865zm5.923 5.945a.885.885 0 0 0 .58.233.885.885 0 0 0 .581-.233.917.917 0 0 0 0-1.282L83.71 7.094a.909.909 0 0 0-1.278 0 .917.917 0 0 0 0 1.282l1.975 1.865zm-7.2.233a.885.885 0 0 0 .58-.233l1.858-1.865a.917.917 0 0 0 0-1.282.909.909 0 0 0-1.278 0L76.51 8.959a.917.917 0 0 0 0 1.282c.233.233.465.233.697.233zm6.038-5.944a.885.885 0 0 0 .58-.234l1.86-1.865a.917.917 0 0 0 0-1.282.909.909 0 0 0-1.278 0l-1.859 1.865a.917.917 0 0 0 0 1.282c.233.117.465.234.697.234zm95.553 65.991a.909.909 0 0 0-1.278 0 .917.917 0 0 0 0 1.282l1.859 1.865a.885.885 0 0 0 .58.233.885.885 0 0 0 .581-.233.917.917 0 0 0 0-1.282l-1.742-1.865zm5.923 6.061a.909.909 0 0 0-1.278 0 .917.917 0 0 0 0 1.283l1.859 1.865a.885.885 0 0 0 .58.233.885.885 0 0 0 .581-.233.917.917 0 0 0 0-1.283l-1.742-1.865zm-5.342 0l-1.859 1.865a.917.917 0 0 0 0 1.283.885.885 0 0 0 .581.233.885.885 0 0 0 .58-.233l1.859-1.865a.917.917 0 0 0 0-1.283c-.232-.35-.813-.35-1.161 0zm5.923-6.06l-1.859 1.864a.917.917 0 0 0 0 1.282.885.885 0 0 0 .581.233.885.885 0 0 0 .58-.233l1.859-1.865a.917.917 0 0 0 0-1.282c-.232-.233-.813-.233-1.161 0zM37.255 48.095c0 2.564 2.09 4.662 4.645 4.662 2.555 0 4.646-2.098 4.646-4.662 0-2.565-2.09-4.663-4.646-4.663-2.555 0-4.645 2.098-4.645 4.663zm7.665 0a2.88 2.88 0 0 1-2.903 2.914 2.88 2.88 0 0 1-2.904-2.914 2.88 2.88 0 0 1 2.904-2.914c1.626 0 2.903 1.398 2.903 2.914zM169.521 116.633c-.465 0-.93.35-.93.932v13.755c0 .466.35.932.93.932.465 0 .93-.35.93-.932v-13.871c0-.467-.465-.816-.93-.816zm0 18.3c-.465 0-.93.35-.93.932v4.43c0 .466.35.932.93.932.465 0 .93-.35.93-.932v-4.43a.918.918 0 0 0-.93-.932z' fill={Colors.shadowGray} />
          <Svg.Path d='M119.132 67.094h-1.51c.116 2.098 1.277 3.264 3.484 3.497v1.282h.813v-1.282c1.045-.117 1.858-.466 2.439-1.166.58-.699.929-1.515.929-2.447 0-.933-.232-1.632-.697-2.099-.465-.466-1.394-.932-2.671-1.165V59.75c.929.116 1.51.7 1.51 1.748h1.51c-.233-1.748-1.278-2.797-3.136-2.914v-1.282h-.697v1.282c-1.045.117-1.742.466-2.323 1.05-.58.582-.929 1.398-.929 2.33 0 1.632 1.045 2.681 3.252 3.148v4.429c-1.161-.35-1.858-1.05-1.974-2.448zm2.787-1.981c.697.233 1.161.466 1.51.699.232.35.348.7.348 1.282 0 1.399-.58 2.098-1.858 2.215v-4.196zm-2.09-2.099c-.349-.233-.465-.699-.465-1.282 0-1.165.58-1.748 1.742-1.981v3.846a4.286 4.286 0 0 1-1.278-.583zm19.627 5.595c2.206 0 3.948-1.748 3.948-3.963 0-2.214-1.742-3.963-3.948-3.963-2.207 0-3.95 1.749-3.95 3.963 0 2.098 1.743 3.963 3.95 3.963zm0-6.294c1.277 0 2.206 1.05 2.206 2.215a2.21 2.21 0 0 1-2.206 2.214c-1.278 0-2.207-1.049-2.207-2.214 0-1.166 1.045-2.215 2.207-2.215zm-36.003 6.294c2.207 0 3.949-1.748 3.949-3.963 0-2.214-1.742-3.963-3.949-3.963s-3.949 1.749-3.949 3.963c0 2.098 1.742 3.963 3.95 3.963zm0-6.294c1.278 0 2.207 1.05 2.207 2.215a2.21 2.21 0 0 1-2.207 2.214c-1.277 0-2.207-1.049-2.207-2.214 0-1.166 1.046-2.215 2.207-2.215z' fill={Colors.lightPink} />
          <Svg.Path d='M156.18 44.83H138.99l12.078-10.49c.349-.35.349-.816.116-1.282l-24.62-28.324c-.117-.233-.35-.233-.581-.35a.885.885 0 0 0-.581.233L72.909 50.193c-.232.116-.232.35-.348.583 0 .233.116.466.232.582L85.8 66.395H42.946c-5.691 0-10.336 4.662-10.336 10.374v65.274c0 5.712 4.645 10.374 10.336 10.374h93.606c5.69 0 10.336-4.662 10.336-10.374v-21.33h4.53a3.377 3.377 0 0 0 3.368-3.38v-15.737c0-1.865-1.51-3.38-3.368-3.38h-4.53V84.23h9.291c.465 0 .93-.35.93-.933V45.763c-.117-.466-.465-.932-.93-.932zM125.867 6.483l23.343 27.159-12.891 11.19h-8.014l9.988-8.626c.232-.116.232-.35.349-.582a.892.892 0 0 0-.233-.583c-.464-.583-.697-1.282-.697-2.098 0-.7.349-1.4.93-1.982.232-.116.232-.35.348-.583a.892.892 0 0 0-.232-.583l-10.453-12.238c-.348-.35-.813-.35-1.277-.117-.58.466-1.278.7-2.09.7-.697 0-1.394-.35-1.975-.933-.116-.233-.348-.233-.58-.35a.885.885 0 0 0-.581.233l-32.17 27.742h-2.904c-.464 0-.929.35-.929.932v18.184L74.651 50.892l51.217-44.41zm-8.478 37.65l-3.252-2.798c.58-.466 1.161-.583 1.51-.583.348 0 .812.233 1.16.583 1.046.816 1.278 1.748.582 2.798zm.929.699c.696-.816.929-1.749.813-2.564-.117-.933-.581-1.632-1.278-2.332-.697-.582-1.394-.932-2.09-.816-.697 0-1.626.467-2.672 1.283l-3.02-2.681c.698-.583 1.51-.7 2.324-.117l1.045-1.166c-1.51-1.049-2.904-.932-4.181.467l-.93-.816-.58.7.93.815c-.581.816-.814 1.632-.814 2.448 0 .816.465 1.515 1.162 2.215 1.277 1.049 2.787.932 4.529-.35l3.368 2.914-.116.116h-2.555c-.116 0-.116-.116-.232-.116l-.117.116H92.304l29.847-25.993c.697.583 1.51.933 2.439.933.93.116 1.858-.117 2.671-.583l9.523 10.957c-.58.7-.929 1.632-.929 2.564-.116.933.116 1.865.581 2.564l-10.917 9.442h-7.2zm-5.923-3.963c-.465.35-.813.466-1.278.583-.464 0-.813-.117-1.277-.467-.813-.699-.93-1.631-.349-2.564l2.904 2.448zm39.022 58.98c.929 0 1.626.7 1.626 1.632v15.736c0 .932-.697 1.631-1.626 1.631H123.893c-.232 0-.348-.116-.464-.233l-3.833-8.042-.464-1.05v-.35l4.297-8.974c.116-.233.232-.35.464-.35H151.418zM145.03 98.1h-21.137c-.813 0-1.626.466-2.09 1.282l-4.297 9.091c0 .117 0 .117-.116.234-.233.582-.233 1.165.116 1.748l4.297 9.092c.348.816 1.161 1.282 2.09 1.282h21.253v21.33c0 4.78-3.832 8.626-8.478 8.626H42.946c-4.762 0-8.478-3.846-8.478-8.625V76.885c0-4.779 3.832-8.625 8.478-8.625h42.97v15.153c0 .466.349.932.93.932h58.3V98.1h-.116zm10.22-15.62H87.658V46.58h26.596c.58.117 1.161.117 1.626 0h39.37V82.48z' fill={Colors.nightRider} />
          <Svg.Path d='M97.53 52.757v.35c-.116 1.399-1.394 2.564-2.787 2.564-.465 0-.93.35-.93.933v15.969c0 .466.35.932.93.932 1.51 0 2.787 1.282 2.787 2.798 0 .466.349.932.93.932h46.222c.464 0 .929-.35.929-.932 0-1.516 1.277-2.798 2.787-2.798.465 0 .93-.35.93-.932V56.487c0-.466-.35-.932-.93-.932-1.51 0-2.787-1.283-2.787-2.798 0-.466-.349-.932-.93-.932H98.344c-.464.116-.813.466-.813.932zm46.223.933c.348 1.865 1.742 3.263 3.6 3.613v14.57c-1.858.35-3.252 1.749-3.6 3.614H99.156c-.348-1.865-1.742-3.264-3.6-3.614v-14.57c1.858-.35 3.252-1.748 3.6-3.613h44.597zm-12.775 61.078a5.338 5.338 0 0 0 5.342-5.362c0-2.914-2.323-5.362-5.342-5.362a5.338 5.338 0 0 0-5.343 5.362c.116 2.914 2.44 5.362 5.343 5.362zm0-8.859c1.974 0 3.6 1.632 3.6 3.614 0 1.981-1.626 3.613-3.6 3.613-1.975 0-3.6-1.632-3.6-3.613.115-2.099 1.625-3.614 3.6-3.614zM57.811 77.818h3.484c.465 0 .93-.35.93-.933 0-.582-.465-.816-.93-.816h-3.484c-.464 0-.929.35-.929.933 0 .583.465.816.93.816zm19.86 0h3.484c.464 0 .929-.35.929-.933 0-.582-.465-.816-.93-.816h-3.483c-.465 0-.93.35-.93.933 0 .583.465.816.93.816zm-9.988 0h3.484c.465 0 .93-.35.93-.933 0-.582-.35-.816-.814-.816H67.8c-.465 0-.93.35-.93.933 0 .583.35.816.814.816zm-15.446-.816c0-.466-.349-.933-.93-.933h-3.484c-.464 0-.929.35-.929.933 0 .583.349.932.93.932h3.484c.58-.116.929-.466.929-.932zm67.475 65.74h3.484c.465 0 .93-.35.93-.932 0-.583-.349-.932-.93-.932h-3.484c-.464 0-.929.35-.929.932 0 .583.465.933.93.933zm-9.988 0h3.485c.464 0 .929-.35.929-.932 0-.583-.349-.932-.93-.932h-3.484c-.464 0-.929.35-.929.932 0 .583.465.933.93.933zm19.86 0h3.484c.465 0 .93-.35.93-.932 0-.583-.35-.932-.93-.932h-3.484c-.465 0-.93.35-.93.932 0 .583.465.933.93.933zm-39.603 0h3.484c.465 0 .93-.35.93-.932 0-.583-.349-.932-.93-.932h-3.484c-.464 0-.929.35-.929.932 0 .583.465.933.93.933zm9.059-.815c0 .466.348.932.929.932h3.484c.465 0 .93-.35.93-.932 0-.583-.35-.933-.93-.933H99.97c-.58 0-.93.35-.93.933zm-45.294-.933h-3.484c-.464 0-.929.35-.929.933 0 .582.349.932.93.932h3.483c.465 0 .93-.35.93-.932 0-.583-.349-.933-.93-.933zm9.988 0H60.25c-.464 0-.929.35-.929.933 0 .582.348.932.93.932h3.483c.465 0 .93-.35.93-.932a.918.918 0 0 0-.93-.933zm-19.86 0h-1.509c-.465 0-.93.35-.93.933 0 .582.35.932.93.932h1.51c.464 0 .929-.35.929-.932a.918.918 0 0 0-.93-.933zm39.604 0h-3.485c-.464 0-.929.35-.929.933 0 .582.349.932.93.932h3.484c.464 0 .929-.35.929-.932 0-.583-.349-.933-.93-.933zm-9.872 0h-3.484c-.465 0-.93.35-.93.933 0 .582.35.932.93.932h3.484c.464 0 .929-.35.929-.932a.918.918 0 0 0-.93-.933zM122.417 29.571c0 2.122 1.743 3.858 3.875 3.858 2.13 0 3.875-1.736 3.875-3.858 0-2.121-1.744-3.857-3.875-3.857-2.132 0-3.875 1.736-3.875 3.857zm6.458 0a2.552 2.552 0 0 1-2.583 2.572 2.552 2.552 0 0 1-2.584-2.572A2.552 2.552 0 0 1 126.292 27c1.446 0 2.583 1.234 2.583 2.571z' fill={Colors.nightRider} />
        </Svg.G>
      </Svg>
    )
  }
}
