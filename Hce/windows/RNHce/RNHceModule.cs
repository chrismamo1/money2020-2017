using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Hce.RNHce
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNHceModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNHceModule"/>.
        /// </summary>
        internal RNHceModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNHce";
            }
        }
    }
}
