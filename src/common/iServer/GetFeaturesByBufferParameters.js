﻿import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {GetFeaturesParametersBase} from './GetFeaturesParametersBase';
import {FilterParameter} from './FilterParameter';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.GetFeaturesByBufferParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据服务中数据集缓冲区查询参数类。
 * @param {Object} options - 参数。</br>
 * @param {number} options.bufferDistance - buffer 距离，单位与所查询图层对应的数据集单位相同。</br>
 * @param {string} options.attributeFilter - 属性查询条件。 </br>
 * @param {Array.<string>} options.fields - 设置查询结果返回字段。默认返回所有字段。</br>
 * @param {Object} options.geometry - 空间查询条件。</br>
 *                                    点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
 *                                    线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
 *                                    面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。</br>
 * @param {Array.<string>} options.dataSetNames - 数据集集合中的数据集名称列表。</br>
 * @param {boolean} options.returnContent - 是否直接返回查询结果。</br>
 * @param {number} options.fromIndex - 查询结果的最小索引号。</br>
 * @param {number} options.toIndex - 查询结果的最大索引号。</br>
 * @extends {SuperMap.GetFeaturesParametersBase}
 */
export class GetFeaturesByBufferParameters extends GetFeaturesParametersBase {


    constructor(options) {
        super(options);
        /**
         * @member {number} SuperMap.GetFeaturesByBufferParameters.prototype.bufferDistance
         * @description buffer距离,单位与所查询图层对应的数据集单位相同。
         */
        this.bufferDistance = null;

        /**
         * @member {string} SuperMap.GetFeaturesByBufferParameters.prototype.queryParameter
         * @description 属性查询条件。
         */
        this.attributeFilter = null;

        /**
         * @member {Object} SuperMap.GetFeaturesByBufferParameters.prototype.geometry
         * @description 空间查询条件。</br>
         * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。</br>
         * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
         */
        this.geometry = null;

        /**
         * @member {Array.<string>} SuperMap.GetFeaturesByBufferParameters.prototype.fields
         * @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
         */
        this.fields = null;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.GetFeaturesByBufferParameters";
    }


    /**
     * @function SuperMap.GetFeaturesByBufferParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.bufferDistance = null;
        me.attributeFilter = null;
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
        if (me.geometry) {
            me.geometry.destroy();
            me.geometry = null;
        }
    }

    /**
     * @function SuperMap.GetFeaturesByBufferParameters.toJsonParameters
     * @description 将SuperMap.GetFeaturesByBufferParameters对象转换为JSON字符串。
     * @param {SuperMap.GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数对象。
     * @returns {string} 转化后的JSON字符串。
     */
    static toJsonParameters(params) {
        var filterParameter,
            paramsBySql,
            geometry;
        geometry = ServerGeometry.fromGeometry(params.geometry);
        paramsBySql = {
            datasetNames: params.datasetNames,
            getFeatureMode: "BUFFER",
            bufferDistance: params.bufferDistance,
            geometry: geometry
        };
        if (params.fields) {
            filterParameter = new FilterParameter();
            filterParameter.name = params.datasetNames;
            filterParameter.fields = params.fields;
            paramsBySql.queryParameter = filterParameter;
        }
        if (params.attributeFilter) {
            paramsBySql.attributeFilter = params.attributeFilter;
            paramsBySql.getFeatureMode = "BUFFER_ATTRIBUTEFILTER";
        }
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            paramsBySql.maxFeatures = params.maxFeatures;
        }
        return Util.toJSON(paramsBySql);
    }


}

SuperMap.GetFeaturesByBufferParameters = GetFeaturesByBufferParameters;