/**
 * This package is reserved.
 * Please use @inbound/sdk for the official Inbound Email SDK.
 */

export interface ReservedPackage {
  __reserved: true;
  message: string;
  officialPackage: string;
  documentation: string;
  repository: string;
}

declare const reserved: ReservedPackage;
export default reserved;



