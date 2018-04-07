/* This will iterate through all the files in logos/ and 'require' them to add them to
 * WebPack's manifest so the output files can be named/processed and also accessed dynamically
 * by any consuming modules.
 * Output will look something like:
 * {
 *   "akamai": "/assets/images/akamai.somehash.png",
 *   etc.
 * }
 */

// const cache: { [s: string]: string } = {};
//
// function importAll(r: any) {
//   r.keys().forEach((key: string) => {
//     const reg = /\.\/([^.]*)/i;
//     const name = key.match(reg);
//     if (name && name[1]) {
//       cache[name[1]] = r(key);
//     }
//   });
// }
//
// const required = (require as any).context('@assets/logos', true, /\.*$/);
// importAll(required);
//
// export default cache;
