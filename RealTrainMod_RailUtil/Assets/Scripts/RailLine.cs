using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RailLine : MonoBehaviour
{
    public LineRenderer lineRenderer;

    public LineRenderer lineStartRenderer;
    public LineRenderer lineEndRenderer;

    public Transform[] transforms = new Transform[4];

    public Material redMaterial;

    public GameObject testBall;

    public int numPoints;
    public List<Vector3> points = new List<Vector3>();

    private Transform selectedTransform; // 현재 선택된 Transform 객체
    private Vector3 screenSpace;
    private Vector3 offset;

    private bool isSphereFixed = false;
    public float fixedSphereTValue;

    public void SetRailLine(Vector3[] positions)
    {
        for (int i = 0; i < positions.Length; i++)
        {
            transforms[i].position = positions[i];
        }
        DrawBezierCurve();
    }

    public Vector3[] GetControlPoints()
    {
        Vector3[] vector3s= new Vector3[transforms.Length];
        for (int i = 0; i < transforms.Length; i++)
        {
            vector3s[i] = transforms[i].position;
        }
        return vector3s;
    }

    bool IsCloseToHalfOrZero(float value)
    {
        float fractionalPart = value % 1; // 소수부 추출
                                          // 소수부가 0.5에 가까운지 또는 0에 가까운지 확인
        return Mathf.Abs(fractionalPart - 0.5f) < 0.1f || Mathf.Abs(fractionalPart) < 0.1f;
    }

    private void Start()
    {
        DrawHelpers();

        for (int i = 0; i < points.Count; i++)
        {
            if (IsCloseToHalfOrZero(points[i].x) && IsCloseToHalfOrZero(points[i].z))
            {
                fixedSphereTValue = (float)(i + 1) / points.Count;
                Debug.Log(fixedSphereTValue);
                

                var obj = Instantiate(testBall, transform);
                obj.transform.position = points[i];
            }
        }
    }

    void Update()
    {
        //if(Input.GetKey(KeyCode.LeftShift))
        //{
        //    Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        //    RaycastHit hit;
        //    if (Physics.Raycast(ray, out hit))
        //    {
        //        for (int i = 0; i < points.Count; i++)
        //        {
        //            if (IsCloseToHalfOrZero(points[i].x) && IsCloseToHalfOrZero(points[i].z))
        //            {
        //                fixedSphereTValue =  (i + 1) / points.Count;

        //                var obj = Instantiate(testBall, transform);
        //                obj.transform.position = points[i];
        //            }
        //        }
        //    }
        //}

        if (Input.GetMouseButtonDown(0))
        {
            RaycastHit clickhit;
            Ray clickray = Camera.main.ScreenPointToRay(Input.mousePosition);

            if (Physics.Raycast(clickray, out clickhit))
            {
                for (int i = 0; i < transforms.Length; i++)
                {
                    if (clickhit.transform == transforms[i])
                    {
                        selectedTransform = transforms[i];
                        screenSpace = Camera.main.WorldToScreenPoint(selectedTransform.position);
                        offset = selectedTransform.position - Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenSpace.z));
                        return;
                    }
                }
            }
        }

        if (Input.GetMouseButtonUp(0))
        {
            if (selectedTransform != null)
            {
                selectedTransform = null; 
            }
        }

        if (selectedTransform != null && Input.GetMouseButton(0))
        {
            var curScreenSpace = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenSpace.z);
            var curPosition = Camera.main.ScreenToWorldPoint(curScreenSpace) + offset;
            selectedTransform.position = curPosition;
        }

        DrawHelpers();
    }

    void DrawHelpers()
    {
        lineStartRenderer.SetPosition(0, transforms[0].position);
        lineStartRenderer.SetPosition(1, transforms[1].position);

        lineEndRenderer.SetPosition(0, transforms[3].position);
        lineEndRenderer.SetPosition(1, transforms[2].position);

        DrawBezierCurve();
    }

    void DrawBezierCurve()
    {
        points.Clear();

        for (int i = 0; i <= numPoints; i++)
        {
            float t = i / (float)numPoints;
            Vector3 point = CalculateBezierPoint(t, transforms[0].position, transforms[1].position, transforms[2].position, transforms[3].position);
            points.Add(point);
        }

        lineRenderer.positionCount = points.Count;
        lineRenderer.SetPositions(points.ToArray());
    }

    Vector3 CalculateBezierPoint(float t, Vector3 p0, Vector3 p1, Vector3 p2, Vector3 p3)
    {
        float u = 1 - t;
        float tt = t * t;
        float uu = u * u;
        float uuu = uu * u;
        float ttt = tt * t;

        Vector3 p = uuu * p0; // 첫 번째 항
        p += 3 * uu * t * p1; // 두 번째 항
        p += 3 * u * tt * p2; // 세 번째 항
        p += ttt * p3; // 네 번째 항

        return p;
    }
}
