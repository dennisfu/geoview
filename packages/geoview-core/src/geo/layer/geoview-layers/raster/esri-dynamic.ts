import { ImageArcGISRest } from 'ol/source';
import { Options as SourceOptions } from 'ol/source/ImageArcGISRest';
import { Options as ImageOptions } from 'ol/layer/BaseImage';
import { Image as ImageLayer } from 'ol/layer';

import { TypeJsonObject } from '../../../../core/types/global-types';
import { getLocalisezValue, getXMLHttpRequest } from '../../../../core/utils/utilities';
import { AbstractGeoViewLayer, CONST_LAYER_TYPES } from '../abstract-geoview-layers';
import { AbstractGeoViewRaster, TypeBaseRasterLayer } from './abstract-geoview-raster';
import {
  TypeImageLayerEntryConfig,
  TypeLayerEntryConfig,
  TypeSourceImageEsriInitialConfig,
  TypeGeoviewLayerConfig,
} from '../../../map/map-schema-types';

export interface TypeEsriDynamicLayerEntryConfig extends Omit<TypeImageLayerEntryConfig, 'source'> {
  source: TypeSourceImageEsriInitialConfig;
}

export interface TypeEsriDynamicLayerConfig extends Omit<TypeGeoviewLayerConfig, 'listOfLayerEntryConfig'> {
  geoviewLayerType: 'esriDynamic';
  listOfLayerEntryConfig: TypeEsriDynamicLayerEntryConfig[];
}

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeGeoviewLayerConfig as a TypeEsriDynamicLayerConfig if the geoviewLayerType attribute of
 * the verifyIfLayer parameter is ESRI_DYNAMIC. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeGeoviewLayerConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @return {boolean} true if the type ascention is valid.
 */
export const layerConfigIsEsriDynamic = (verifyIfLayer: TypeGeoviewLayerConfig): verifyIfLayer is TypeEsriDynamicLayerConfig => {
  return verifyIfLayer.geoviewLayerType === CONST_LAYER_TYPES.ESRI_DYNAMIC;
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines an AbstractGeoViewLayer as an EsriDynamic if the type attribute of the verifyIfGeoViewLayer
 * parameter is ESRI_DYNAMIC. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {AbstractGeoViewLayer} verifyIfGeoViewLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @return {boolean} true if the type ascention is valid.
 */
export const geviewLayerIsEsriDynamic = (verifyIfGeoViewLayer: AbstractGeoViewLayer): verifyIfGeoViewLayer is EsriDynamic => {
  return verifyIfGeoViewLayer.type === CONST_LAYER_TYPES.ESRI_DYNAMIC;
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeLayerEntryConfig as a TypeEsriDynamicLayerEntryConfig if the geoviewLayerType attribute of
 * the verifyIfGeoViewEntry.geoviewLayerParent attribute is ESRI_DYNAMIC. The type ascention applies only to the true block of
 * the if clause that use this function.
 *
 * @param {TypeLayerEntryConfig} verifyIfGeoViewEntry Polymorphic object to test in order to determine if the type ascention is valid
 *
 * @return {boolean} true if the type ascention is valid
 */
export const geoviewEntryIsEsriDynamic = (
  verifyIfGeoViewEntry: TypeLayerEntryConfig
): verifyIfGeoViewEntry is TypeEsriDynamicLayerEntryConfig => {
  return verifyIfGeoViewEntry.geoviewLayerParent!.geoviewLayerType === CONST_LAYER_TYPES.ESRI_DYNAMIC;
};

// ******************************************************************************************************************************
// ******************************************************************************************************************************
/** ******************************************************************************************************************************
 * A class to add esri dynamic layer.
 *
 * @exports
 * @class EsriDynamic
 */
// ******************************************************************************************************************************
export class EsriDynamic extends AbstractGeoViewRaster {
  /** Service metadata */
  metadata: TypeJsonObject = {};

  /** ****************************************************************************************************************************
   * Initialize layer.
   * @param {string} mapId The id of the map.
   * @param {TypeEsriDynamicLayerConfig} layerConfig The layer configuration.
   */
  constructor(mapId: string, layerConfig: TypeEsriDynamicLayerConfig) {
    super(CONST_LAYER_TYPES.ESRI_DYNAMIC, layerConfig, mapId);
  }

  /** ****************************************************************************************************************************
   * This method reads from the metadataAccessPath additional information to complete the GeoView layer configuration.
   */
  getAdditionalServiceDefinition(): Promise<void> {
    const promisedExecution = new Promise<void>((resolve) => {
      const data = getXMLHttpRequest(`${getLocalisezValue(this.metadataAccessPath, this.mapId)}?f=json`);
      data.then((value) => {
        if (value !== '{}') {
          this.metadata = JSON.parse(value) as TypeJsonObject;
        }
        resolve();
      });
    });
    return promisedExecution;
  }

  /** ****************************************************************************************************************************
   * This method creates a GeoView EsriDynamic layer using the definition provided in the layerEntry parameter.
   *
   * @param {TypeEsriDynamicLayerEntryConfig} layerEntry Information needed to create the GeoView layer.
   *
   * @returns {TypeBaseRasterLayer} The GeoView raster layer that has been created.
   */
  processOneLayerEntry(layerEntry: TypeEsriDynamicLayerEntryConfig): Promise<TypeBaseRasterLayer | null> {
    const promisedVectorLayer = new Promise<TypeBaseRasterLayer | null>((resolve) => {
      const sourceOptions: SourceOptions = {};
      sourceOptions.attributions = [(this.metadata.copyrightText ? this.metadata.copyrightText : '') as string];
      sourceOptions.url = getLocalisezValue(layerEntry.source.dataAccessPath, this.mapId);
      sourceOptions.params = { LAYERS: `show:${layerEntry.info!.layerId}` };
      if (layerEntry.source.transparent) Object.defineProperty(sourceOptions.params, 'transparent', layerEntry.source.transparent!);
      if (layerEntry.source.format) Object.defineProperty(sourceOptions.params, 'format', layerEntry.source.format!);
      if (layerEntry.source.crossOrigin) sourceOptions.crossOrigin = layerEntry.source.crossOrigin;
      if (layerEntry.source.projection) sourceOptions.projection = `EPSG:${layerEntry.source.projection}`;

      const imageLayerOptions: ImageOptions<ImageArcGISRest> = {
        source: new ImageArcGISRest(sourceOptions),
        properties: { layerConfig: layerEntry },
      };
      if (layerEntry.initialSettings?.className) imageLayerOptions.className = layerEntry.initialSettings?.className;
      if (layerEntry.initialSettings?.extent) imageLayerOptions.extent = layerEntry.initialSettings?.extent;
      if (layerEntry.initialSettings?.maxZoom) imageLayerOptions.maxZoom = layerEntry.initialSettings?.maxZoom;
      if (layerEntry.initialSettings?.minZoom) imageLayerOptions.minZoom = layerEntry.initialSettings?.minZoom;
      if (layerEntry.initialSettings?.opacity) imageLayerOptions.opacity = layerEntry.initialSettings?.opacity;
      if (layerEntry.initialSettings?.visible) imageLayerOptions.visible = layerEntry.initialSettings?.visible;

      const esriLayer = new ImageLayer(imageLayerOptions);

      resolve(esriLayer);
    });
    return promisedVectorLayer;
  }

  /**
   * This method associate a renderer to the GeoView layer.
   *
   * @param {TypeLayerEntryConfig} layerEntry Information needed to create the renderer.
   * @param {TypeBaseRasterLayer} rasterLayer The GeoView layer associated to the renderer.
   */
  setRenderer(layerEntry: TypeLayerEntryConfig, rasterLayer: TypeBaseRasterLayer): void {
    // eslint-disable-next-line no-console
    console.log('This method needs to be coded!');
    // eslint-disable-next-line no-console
    console.log(layerEntry, rasterLayer);
  }

  /**
   * This method register the GeoView layer to panels that offer this possibility.
   *
   * @param {TypeLayerEntryConfig} layerEntry Information needed to create the renderer.
   * @param {TypeBaseRasterLayer} rasterLayer The GeoView layer who wants to register.
   */
  registerToPanels(layerEntry: TypeLayerEntryConfig, rasterLayer: TypeBaseRasterLayer): void {
    // eslint-disable-next-line no-console
    console.log('This method needs to be coded!');
    // eslint-disable-next-line no-console
    console.log(layerEntry, rasterLayer);
  }
}
